package com.chatup.chatup.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class ClaudeService {

    private static final String API_URL = "https://api.groq.com/openai/v1/chat/completions";
    private static final MediaType JSON  = MediaType.get("application/json; charset=utf-8");
    private static final String SYSTEM_PROMPT =
            "You are a helpful AI assistant embedded in ChatUp, a real-time group chat room. " +
            "Keep replies concise and conversational. " +
            "Use markdown formatting where helpful: **bold**, `code`, bullet lists, and fenced code blocks.";

    @Value("${groq.api.key}")
    private String apiKey;

    @Value("${groq.model}")
    private String model;

    private final OkHttpClient httpClient  = new OkHttpClient();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public String ask(String userMessage, String askerName) {
        try {
            String content = (askerName != null && !askerName.isBlank())
                    ? askerName + " asks: " + userMessage
                    : userMessage;

            Map<String, Object> systemMsg = new LinkedHashMap<>();
            systemMsg.put("role", "system");
            systemMsg.put("content", SYSTEM_PROMPT);

            Map<String, Object> userMsg = new LinkedHashMap<>();
            userMsg.put("role", "user");
            userMsg.put("content", content);

            Map<String, Object> requestBody = new LinkedHashMap<>();
            requestBody.put("model", model);
            requestBody.put("max_tokens", 1024);
            requestBody.put("messages", List.of(systemMsg, userMsg));

            String body = objectMapper.writeValueAsString(requestBody);

            Request request = new Request.Builder()
                    .url(API_URL)
                    .post(RequestBody.create(body, JSON))
                    .addHeader("Authorization", "Bearer " + apiKey)
                    .addHeader("Content-Type", "application/json")
                    .build();

            try (Response response = httpClient.newCall(request).execute()) {
                String responseBody = response.body().string();
                JsonNode root = objectMapper.readTree(responseBody);
                return root.path("choices").get(0).path("message").path("content").asText();
            }
        } catch (Exception e) {
            return "Sorry, I couldn't process that right now.";
        }
    }
}

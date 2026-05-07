# ChatUp - Real-time Chat Application 

[![Java](https://img.shields.io/badge/Java-17-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.4.5-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![WebSocket](https://img.shields.io/badge/WebSocket-STOMP-blue.svg)](https://docs.spring.io/spring-framework/reference/web/websocket.html)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge)](https://chatup-jg85.onrender.com)

## 📝 Overview

ChatUp is a modern, real-time chat application built with Spring Boot and WebSocket technology. It provides a seamless messaging experience with a clean, responsive user interface. This application demonstrates the implementation of real-time communication using WebSockets in a Java Spring Boot environment.

<img src="Snaps%20V2/Landing%20page.png" alt="Landing Page V2">

## ✨ Features

### Core Functionality
- **Real-time Messaging**: Instant message delivery using WebSocket technology
- **User Presence**: Automatic join/leave notifications when users enter or exit the chat
- **Message History**: View all messages exchanged in the current session
- **Colorful User Avatars**: Automatically generated colorful avatars based on usernames
- **User-friendly Notifications**: System messages for user activity

### AI Assistant (v2)
- **`@ai` command**: Prefix any message with `@ai` to query the Groq-powered LLaMA model
- **Markdown rendering**: AI replies render bold, code blocks, lists, and more
- **Autocomplete popup**: Typing `@` shows a suggestion — press Tab to complete `@ai`
- **Username context**: The AI knows who asked, making replies more personal

### User Interface
- **Responsive Design**: Fully responsive layout that works on desktops, tablets, and mobile devices
- **Modern UI Components**: Clean and intuitive user interface with well-designed components
- **Visual Message Distinction**: Self messages appear on the right (blue), and others' messages on the left (gray)
- **Message Styling**: Bubble-style chat messages with avatar icons
- **Empty State Handling**: Helpful message when no messages are present
- **Connection Status**: Visual feedback during WebSocket connection

### Technical Features
- **WebSocket Implementation**: Uses STOMP protocol over WebSocket for reliable messaging
- **Spring MVC Architecture**: Well-structured application using Spring MVC design patterns
- **Event-driven Communication**: Backend event listeners for WebSocket connections/disconnections
- **CSS Variables**: Theme-based styling with CSS custom properties for easy customization
- **Cross-browser Compatibility**: Works on all modern browsers

## 🤖 AI Assistant (v2)

ChatUp v2 adds a built-in Groq-powered AI assistant. Type `@ai` followed by any question in the chat room and the AI replies instantly — right inside the conversation, visible to everyone.

- Powered by **Groq** (LLaMA 3.3 70B) for near-instant responses
- Replies render with **Markdown** formatting (bold, code blocks, lists)
- Autocomplete popup appears when you type `@` — press **Tab** to confirm
- No separate window or tab needed — the AI is part of the room

## 🛠️ Technology Stack

### Backend
- **Java 17**: Modern Java language features
- **Spring Boot**: Rapid application development framework
- **Spring WebSocket**: WebSocket integration with Spring
- **STOMP Protocol**: Simple Text Oriented Messaging Protocol
- **SLF4J**: Simple Logging Facade for Java

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with custom properties and flexbox/grid
- **JavaScript (ES6+)**: Modern JavaScript with ES6+ features
- **SockJS**: WebSocket emulation for browsers without WebSocket support
- **STOMP.js**: STOMP client for JavaScript
- **marked.js**: Markdown rendering for AI replies
- **DOMPurify**: XSS sanitisation for AI-generated HTML

### AI (v2)
- **Groq API**: LLaMA 3.3 70B — ultra-fast inference
- **OkHttp**: HTTP client for Groq API calls

### DevOps
- **Docker**: Containerization for consistent deployment
- **Render**: Cloud platform for hosting the application

## 🚀 Getting Started

### Prerequisites

- Java JDK 17 or higher
- Maven 3.6.0 or higher
- Git
- Docker (optional for containerized deployment)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/HassanYosuf/chatup.git
   cd chatup
   ```

2. Build the application:
   ```bash
   ./mvnw clean install
   ```

3. Set the Groq API key environment variable:
   ```bash
   # macOS / Linux
   export GROQ_API_KEY=your_key_here

   # Windows PowerShell
   $env:GROQ_API_KEY="your_key_here"
   ```

4. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```

5. Access the application:
   Open your browser and navigate to `http://localhost:8080`
   
## 🚢 Deploying to Render

1. Create a new Web Service on Render:
   - Connect your GitHub repository
   - Select "Docker" as the environment
   - Choose the appropriate instance type (at least 512MB RAM recommended)
   - Set the "Port" environment variable to match the port in your application (default: 8080)

2. Configure environment variables:
   - Add `GROQ_API_KEY` with your Groq API key — required for the AI assistant to work

3. Deploy:
   - Click "Create Web Service" and Render will automatically build and deploy your application
   - Access your application at the URL provided by Render
## 🧪 How It Works

1. **WebSocket Configuration**: The application configures WebSocket endpoints and message brokers.
2. **User Connection**: Users enter their names to join the chat room.
3. **WebSocket Connection**: Upon joining, a WebSocket connection is established.
4. **Message Exchange**: Messages are exchanged via the STOMP protocol over WebSocket.
5. **Event Handling**: The application handles user join/leave events and broadcasts them to all users.
6. **Real-time Updates**: Messages appear instantly for all connected users.

## 🔍 Project Structure

<img src="Snaps%20V2/process.png" alt="Project Structure">

## 📷 Screenshots — V1 → V2

### Landing Page
| V1 | V2 |
|:--:|:--:|
| <img src="Snaps%20V1/Landing%20page.png" alt="Landing V1" width="420"> | <img src="Snaps%20V2/Landing%20page.png" alt="Landing V2" width="420"> |

### Login / Auth Screen
| V1 | V2 |
|:--:|:--:|
| <img src="Snaps%20V1/Auth%20-%20window.png" alt="Auth V1" width="420"> | <img src="Snaps%20V2/Auth%20-%20window.png" alt="Auth V2" width="420"> |

### Chat Room
| V1 | V2 (with AI replies) |
|:--:|:--:|
| <img src="Snaps%20V1/Chat%20Room%20-%201.png" alt="Chat V1" width="420"> | <img src="Snaps%20V2/Chat%20Room%20-%201.png" alt="Chat V2" width="420"> |

### User Presence & Final Chat
| V1 | V2 |
|:--:|:--:|
| <img src="Snaps%20V1/New%20User%20Joined.png" alt="Join V1" width="420"> | <img src="Snaps%20V2/New%20User%20Joined.png" alt="Join V2" width="420"> |
| <img src="Snaps%20V1/Final%20Chat.png" alt="Final V1" width="420"> | <img src="Snaps%20V2/Final%20Chat.png" alt="Final V2" width="420"> |


### Key Files

- `Dockerfile`: Configuration for containerizing the application
- `src/main/java/com/chatup/chatup/Config/WebSocketConfig.java`: WebSocket configuration
- `src/main/java/com/chatup/chatup/Controller/`: Contains controllers for handling WebSocket communications
- `src/main/resources/static/`: Frontend resources including HTML, CSS, and JavaScript
- `src/main/resources/application.properties`: Application configuration

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.


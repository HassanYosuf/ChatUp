'use strict';

// Configure marked for GFM + line breaks
if (typeof marked !== 'undefined') {
    marked.use({ gfm: true, breaks: true });
}

let usernamePage = document.querySelector('#username-page');
let chatPage = document.querySelector('#chat-page');
let usernameForm = document.querySelector('#usernameForm');
let messageForm = document.querySelector('#messageForm');
let messageInput = document.querySelector('#message');
let messageArea = document.querySelector('#messageArea');
let connectingElement = document.querySelector('.connecting');

let stompClient = null;
let username = null;

const colors = [
    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
];

function connect(event) {
    username = document.querySelector('#name').value.trim();

    if (username) {
        usernamePage.classList.add('hidden');
        chatPage.classList.remove('hidden');

        const socket = new SockJS('/websocket');
        stompClient = Stomp.over(socket);

        stompClient.connect({}, onConnected, onError);
    }
    event.preventDefault();
}

function onConnected() {
    stompClient.subscribe('/topic/public', onMessageReceived);

    stompClient.send('/app/chat.register', {},
        JSON.stringify({ sender: username, type: 'JOIN' })
    );

    document.querySelector('.connecting').classList.add('hidden');
    usernamePage.classList.add('hidden');
    chatPage.classList.remove('hidden');
    connectingElement.classList.add('hidden');
    messageInput.focus();
    document.querySelector('.empty-message').classList.add('hidden');
}

function onError(error) {
    connectingElement.textContent = 'Server unavailable!!';
    connectingElement.style.color = 'red';
}

function send(event) {
    const messageContent = messageInput.value.trim();

    if (messageContent && stompClient) {
        const chatMessage = {
            sender: username,
            content: messageInput.value,
            type: 'CHAT'
        };
        stompClient.send('/app/chat.send', {}, JSON.stringify(chatMessage));
        messageInput.value = '';
    }
    event.preventDefault();
}

function onMessageReceived(payload) {
    const message = JSON.parse(payload.body);

    const emptyMessage = document.querySelector('.empty-message');
    if (emptyMessage && !emptyMessage.classList.contains('hidden')) {
        emptyMessage.classList.add('hidden');
    }

    const messageElement = document.createElement('li');

    if (message.type === 'JOIN') {
        messageElement.classList.add('event-message');
        const p = document.createElement('p');
        p.textContent = '✨ ' + message.sender + ' joined the room';
        messageElement.appendChild(p);

    } else if (message.type === 'LEAVE') {
        messageElement.classList.add('event-message');
        const p = document.createElement('p');
        p.textContent = message.sender + ' left the room';
        messageElement.appendChild(p);

    } else {
        const isAI   = message.sender === 'AI Assistant';
        const isSelf = !isAI && message.sender === username;

        messageElement.classList.add('chat-message');
        messageElement.classList.add(isSelf ? 'self' : 'other');
        if (isAI) messageElement.classList.add('ai-message');

        // label: AI badge or sender name above the bubble
        if (isAI) {
            const label = document.createElement('div');
            label.classList.add('ai-label');
            label.textContent = '✦ AI Assistant';
            messageElement.appendChild(label);
        } else if (!isSelf) {
            const senderEl = document.createElement('span');
            senderEl.classList.add('sender-name');
            senderEl.textContent = message.sender;
            messageElement.appendChild(senderEl);
        }

        // row: avatar (others only) + bubble
        const row = document.createElement('div');
        row.classList.add('message-row');

        if (!isSelf) {
            const avatarEl = document.createElement('i');
            if (isAI) {
                avatarEl.textContent = '✦';
                avatarEl.style.background = 'linear-gradient(135deg, #6366f1, #8b5cf6)';
            } else {
                avatarEl.textContent = message.sender[0];
                avatarEl.style.backgroundColor = getAvatarColor(message.sender);
            }
            row.appendChild(avatarEl);
        }

        let bubble;
        if (isAI && typeof marked !== 'undefined' && typeof DOMPurify !== 'undefined') {
            bubble = document.createElement('div');
            bubble.classList.add('ai-content');
            bubble.innerHTML = DOMPurify.sanitize(marked.parse(message.content));
        } else {
            bubble = document.createElement('p');
            bubble.textContent = message.content;
        }
        row.appendChild(bubble);

        messageElement.appendChild(row);
    }

    messageArea.appendChild(messageElement);
    messageArea.scrollTop = messageArea.scrollHeight;
}

function getAvatarColor(messageSender) {
    let hash = 0;
    for (let i = 0; i < messageSender.length; i++) {
        hash = 31 * hash + messageSender.charCodeAt(i);
    }
    const index = Math.abs(hash % colors.length);
    return colors[index];
}

function exitChat() {
    if (stompClient) {
        stompClient.send('/app/chat.register', {},
            JSON.stringify({ sender: username, type: 'LEAVE' })
        );
        stompClient.disconnect();
    }
    chatPage.classList.add('hidden');
    usernamePage.classList.remove('hidden');
    document.querySelector('.empty-message').classList.remove('hidden');
    username = null;
    stompClient = null;
}

function setupAiAutocomplete() {
    const suggestion = document.getElementById('ai-suggestion');
    if (!suggestion) return;

    function getWordAtCursor() {
        const pos = messageInput.selectionStart;
        const before = messageInput.value.slice(0, pos);
        const spaceIdx = before.lastIndexOf(' ');
        return before.slice(spaceIdx + 1);
    }

    function applySuggestion() {
        const pos = messageInput.selectionStart;
        const text = messageInput.value;
        const before = text.slice(0, pos);
        const spaceIdx = before.lastIndexOf(' ');
        const after = text.slice(pos);
        const prefix = text.slice(0, spaceIdx + 1);
        messageInput.value = prefix + '@ai ' + after;
        const newPos = prefix.length + 4;
        messageInput.setSelectionRange(newPos, newPos);
        hide();
        messageInput.focus();
    }

    function show() { suggestion.classList.remove('hidden'); }
    function hide() { suggestion.classList.add('hidden'); }

    messageInput.addEventListener('input', function () {
        const word = getWordAtCursor();
        const matches = word.startsWith('@') && '@ai'.startsWith(word.toLowerCase()) && word.length >= 1 && word.length <= 3;
        matches ? show() : hide();
    });

    messageInput.addEventListener('keydown', function (e) {
        if (suggestion.classList.contains('hidden')) return;
        if (e.key === 'Tab') {
            e.preventDefault();
            applySuggestion();
        } else if (e.key === 'Escape') {
            hide();
        }
    });

    suggestion.querySelector('.ai-suggestion-item').addEventListener('mousedown', function (e) {
        e.preventDefault();
        applySuggestion();
    });

    messageInput.addEventListener('blur', function () {
        setTimeout(hide, 150);
    });
}

// Event listeners
usernameForm.addEventListener('submit', connect, true);
messageForm.addEventListener('submit', send, true);
document.querySelector('#exit-chat').addEventListener('click', exitChat);
setupAiAutocomplete();

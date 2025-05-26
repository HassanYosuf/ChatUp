'use strict';

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

    if(username) {
        usernamePage.classList.add('hidden');
        chatPage.classList.remove('hidden');

        const socket = new SockJS('/websocket');
        stompClient = Stomp.over(socket);

        stompClient.connect({}, onConnected, onError);
    }
    event.preventDefault();
}


        function onConnected() {
    // Subscribe to the Public Topic
    stompClient.subscribe('/topic/public', onMessageReceived);

    // Tell your username to the server
    stompClient.send("/app/chat.register",
        {},
        JSON.stringify({sender: username, type: 'JOIN'})
    );
    
    // Hide the login page and show chat page
    document.querySelector('.connecting').classList.add('hidden');
    usernamePage.classList.add('hidden');
    chatPage.classList.remove('hidden');

    connectingElement.classList.add('hidden');
    
    // Focus on message input when connected
    messageInput.focus();
    
    // Hide empty message when connected
    document.querySelector('.empty-message').classList.add('hidden');
}


function onError(error) {
    connectingElement.textContent = 'Server unavailable!!';
    connectingElement.style.color = 'red';
}


function send(event) {
    const messageContent = messageInput.value.trim();

    if(messageContent && stompClient) {
        const chatMessage = {
            sender: username,
            content: messageInput.value,
            type: 'CHAT'
        };

        stompClient.send("/app/chat.send", {}, JSON.stringify(chatMessage));
        messageInput.value = '';
    }
    event.preventDefault();
}


function onMessageReceived(payload) {
    const message = JSON.parse(payload.body);

    // Hide the empty message when messages start coming in
    const emptyMessage = document.querySelector('.empty-message');
    if (emptyMessage && !emptyMessage.classList.contains('hidden')) {
        emptyMessage.classList.add('hidden');
    }

    const messageElement = document.createElement('li');

    if(message.type === 'JOIN') {
        messageElement.classList.add('event-message');
        message.content = message.sender + ' joined!';
    } else if (message.type === 'LEAVE') {
        messageElement.classList.add('event-message');
        message.content = message.sender + ' left!';
    } else {
        messageElement.classList.add('chat-message');

        // Add self or other class based on sender
        if (message.sender === username) {
            messageElement.classList.add('self');
        } else {
            messageElement.classList.add('other');
        }

        const avatarElement = document.createElement('i');
        const avatarText = document.createTextNode(message.sender[0]);
        avatarElement.appendChild(avatarText);
        avatarElement.style['background-color'] = getAvatarColor(message.sender);

        messageElement.appendChild(avatarElement);

        const usernameElement = document.createElement('span');
        const usernameText = document.createTextNode(message.sender);
        usernameElement.appendChild(usernameText);
        messageElement.appendChild(usernameElement);
    }

    const textElement = document.createElement('p');
    const messageText = document.createTextNode(message.content);
    textElement.appendChild(messageText);

    messageElement.appendChild(textElement);

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
// This function can be used if you want to refactor message creation
function createMessageElement(message) {
    const messageElement = document.createElement('li');
    messageElement.classList.add('chat-message');
    
    // Add different classes based on who sent the message
    if (message.sender === username) {
        messageElement.classList.add('self'); // your messages
    } else {
        messageElement.classList.add('other'); // other person's messages
    }

    const avatarElement = document.createElement('i');
    const avatarText = document.createTextNode(message.sender[0]); // First letter of sender's name
    avatarElement.appendChild(avatarText);
    avatarElement.style['background-color'] = getAvatarColor(message.sender);

    const usernameElement = document.createElement('span');
    const usernameText = document.createTextNode(message.sender);
    usernameElement.appendChild(usernameText);

    const textElement = document.createElement('p');
    const messageText = document.createTextNode(message.content);
    textElement.appendChild(messageText);

    messageElement.appendChild(avatarElement);
    messageElement.appendChild(usernameElement);
    messageElement.appendChild(textElement);

    return messageElement;
}
function exitChat() {
    if (stompClient) {
        stompClient.send("/app/chat.register",
            {},
            JSON.stringify({sender: username, type: 'LEAVE'})
        );
        stompClient.disconnect();
    }
    chatPage.classList.add('hidden');
    usernamePage.classList.remove('hidden');
    document.querySelector('.empty-message').classList.remove('hidden');
    username = null;
    stompClient = null;
}

// Event listeners
usernameForm.addEventListener('submit', connect, true);
messageForm.addEventListener('submit', send, true);
document.querySelector('#exit-chat').addEventListener('click', exitChat);
# ChatUp - Real-time Chat Application

[![Java](https://img.shields.io/badge/Java-17-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.4.5-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![WebSocket](https://img.shields.io/badge/WebSocket-STOMP-blue.svg)](https://docs.spring.io/spring-framework/reference/web/websocket.html)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📝 Overview

ChatUp is a modern, real-time chat application built with Spring Boot and WebSocket technology. It provides a seamless messaging experience with a clean, responsive user interface. This application demonstrates the implementation of real-time communication using WebSockets in a Java Spring Boot environment.

<img src="Snaps/Landing page.png" alt="Landing Page">

## ✨ Features

### Core Functionality
- **Real-time Messaging**: Instant message delivery using WebSocket technology
- **User Presence**: Automatic join/leave notifications when users enter or exit the chat
- **Message History**: View all messages exchanged in the current session
- **Colorful User Avatars**: Automatically generated colorful avatars based on usernames
- **User-friendly Notifications**: System messages for user activity

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
   git clone https://github.com/yourusername/chatup.git
   cd chatup
   ```

2. Build the application:
   ```bash
   ./mvnw clean install
   ```

3. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```

4. Access the application:
   Open your browser and navigate to `http://localhost:8080`
   
## 🚢 Deploying to Render

1. Create a new Web Service on Render:
   - Connect your GitHub repository
   - Select "Docker" as the environment
   - Choose the appropriate instance type (at least 512MB RAM recommended)
   - Set the "Port" environment variable to match the port in your application (default: 8080)

2. Configure environment variables (if needed):
   - Add any custom environment variables required by your application

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
<img src="Snaps/process.png" alt="process">

## 📷 Snap Shots
<img src="Snaps/Auth - window.png" alt="Auth - window" width="400" height="200">
<img src="Snaps/Chat Room - 1.png" alt="Chat Room" width="500" height="400">
<img src="Snaps/New User Joined.png" alt="New User Joined" width="500" height="50">
<img src="Snaps/Final Chat.png" alt="Final Chat" width="500" height="500">


### Key Files

- `Dockerfile`: Configuration for containerizing the application
- `src/main/java/com/chatup/chatup/Config/WebSocketConfig.java`: WebSocket configuration
- `src/main/java/com/chatup/chatup/Controller/`: Contains controllers for handling WebSocket communications
- `src/main/resources/static/`: Frontend resources including HTML, CSS, and JavaScript
- `src/main/resources/application.properties`: Application configuration

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.


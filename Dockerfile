# Use the official Maven image for building the application
FROM maven:3.9.4-eclipse-temurin-17 AS build

# Set the working directory in the container
WORKDIR /app

# Copy the pom.xml file
COPY pom.xml .

# Copy the source code
COPY src ./src/

# Package the application
RUN mvn clean package -DskipTests

# Create the runtime container
FROM eclipse-temurin:17-jre-jammy

# Set the working directory
WORKDIR /app

# Copy the jar file from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the port the app runs on
EXPOSE 8080

# Set JVM options for containerized environment
ENV JAVA_OPTS="-Xms256m -Xmx512m"

# Run the application
CMD java $JAVA_OPTS -jar app.jar

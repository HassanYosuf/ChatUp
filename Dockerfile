# Use OpenJDK 17 as the base image for building
FROM eclipse-temurin:17-jdk-jammy as build

# Set the working directory in the container
WORKDIR /app

# First, copy the entire project to ensure all necessary files are available
# This is more resilient than copying individual directories
COPY . .

# Make the Maven wrapper executable
RUN chmod +x mvnw

# Build the application
RUN ./mvnw package -DskipTests

# Use JRE for the runtime image to reduce size
FROM eclipse-temurin:17-jre-jammy

# Set the working directory
WORKDIR /app

# Copy the built jar file from the build stage
COPY --from=build /app/target/*.jar app.jar

# Create a non-root user to run the application
RUN groupadd -r spring && useradd -r -g spring spring

# Change ownership to the non-root user
RUN chown spring:spring /app/app.jar

# Use the non-root user to run the application
USER spring

# Expose the port the app runs on
EXPOSE 8080

# Set JVM options for containerized environment
ENV JAVA_OPTS="-Xms256m -Xmx512m -XX:+UseContainerSupport"

# Run the jar file
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]

# Use OpenJDK 17 as the base image for building
FROM eclipse-temurin:17-jdk-jammy as build

# Set the working directory in the container
WORKDIR /app

# Copy the Maven wrapper and pom.xml
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./

# Download all dependencies (separate layer for caching)
RUN chmod +x ./mvnw && ./mvnw dependency:go-offline -B

# Copy the project source
COPY src ./src/

# Build the application
RUN ./mvnw package -DskipTests

# Use JRE for the runtime image to reduce size
FROM eclipse-temurin:17-jre-jammy

# Create a non-root user to run the application
RUN addgroup --system --gid 1001 appuser \
    && adduser --system --uid 1001 --gid 1001 appuser

# Set the working directory
WORKDIR /app

# Copy the built jar file from the build stage
COPY --from=build /app/target/*.jar app.jar

# Change ownership to the non-root user
RUN chown -R appuser:appuser /app

# Use the non-root user to run the application
USER appuser

# Expose the port the app runs on
EXPOSE 8080

# Set JVM options for containerized environment
ENV JAVA_OPTS="-Xms256m -Xmx512m -XX:+UseContainerSupport"

# Run the jar file
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]

FROM maven:3.8.4-openjdk-17 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn clean package -DskipTests

FROM openjdk:17-slim
WORKDIR /app
COPY --from=build /app/target/nullpointer-0.0.1-SNAPSHOT.jar ./nullpointer-0.0.1-SNAPSHOT.jar
EXPOSE 8080

CMD ["java", "-jar", "nullpointer-0.0.1-SNAPSHOT.jar"]

FROM maven:3.9.8-amazoncorretto-21 as maven
WORKDIR /usr/src/app
COPY . .
RUN mvn package -DskipTests

FROM openjdk:21-oracle
WORKDIR /usr/src/app
COPY --from=maven /usr/src/app/target/assemblyvote-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar","app.jar", "-Xms512M", "-Xmx1024M"]
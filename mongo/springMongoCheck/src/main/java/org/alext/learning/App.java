package org.alext.learning;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@ComponentScan({"org.alext.learning"})
@EnableMongoRepositories(basePackages = "org.alext.learning.repository")
public class App {
    public static void main(String[] args){
        //System.out.println("Hello World!");
        SpringApplication.run(App.class, args);
    }
}

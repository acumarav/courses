package org.alext.learning;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("org.alext.learning")
public class UxApp {

    public static void main(String[] args) {
        SpringApplication.run(UxApp.class, args);
    }
}

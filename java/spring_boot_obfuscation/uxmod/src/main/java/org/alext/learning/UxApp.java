package org.alext.learning;

import org.alext.learning.model.User;
import org.alext.learning.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.stream.Stream;

@SpringBootApplication
public class UxApp {
    public static void main(String[] args) {
        SpringApplication.run(UxApp.class, args);
    }

    class Initializer implements CommandLineRunner{

        private final UserRepository repo;

        @Autowired
        Initializer(UserRepository repo) {
            this.repo = repo;

            Stream.of("Alex","Dmitry","Jon","Paul","Maria","Eva").forEach(name->{
                User user=new User();
                user.setName(name);
                user.setEmail(name+"@dummy.com");
                repo.save(user);
            });

        }

        @Override
        public void run(String... strings) throws Exception {

        }
    }
}

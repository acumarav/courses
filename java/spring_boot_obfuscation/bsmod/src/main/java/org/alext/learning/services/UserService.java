package org.alext.learning.services;

import org.alext.learning.model.User;
import org.alext.learning.repositories.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by alext on 4/11/2017.
 */
@Service
public class UserService {

    private static Logger log = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;

    private int customInt = 8;


    public List<User> getAllUsers() {

        this.customInt = calcCustomInt("hello");

        log.info("custom int {}", customInt);
        return userRepository.findAll();

    }

    private int calcCustomInt(String hello) {
        if (hello != null) {
            return hello.length();
        } else {
            return 786;
        }
    }

}

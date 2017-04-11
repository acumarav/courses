package org.alext.learning.services;

import org.alext.learning.model.User;
import org.alext.learning.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by alext on 4/11/2017.
 */
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;


    List<User> getAllUsers(){
        return userRepository.findAll();
    }


}

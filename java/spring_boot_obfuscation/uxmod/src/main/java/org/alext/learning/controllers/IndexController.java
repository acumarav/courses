package org.alext.learning.controllers;

import org.alext.learning.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by alext on 4/11/2017.
 */
@Controller
@RequestMapping("/")
public class IndexController {

    @Autowired
    private UserService userService;




}

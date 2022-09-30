package com.johnpier.labproject.controllers;

import com.johnpier.labproject.configs.Constants;
import com.johnpier.labproject.services.UserRepositoryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletContext;

@RestController
@Slf4j
@RequestMapping(Constants.API_VERSION)
@CrossOrigin(origins = "*", maxAge = 4800, methods = {RequestMethod.POST, RequestMethod.GET, RequestMethod.PUT}, allowedHeaders = "*")
public class MainController {
    private final UserRepositoryService userService;

    public MainController(UserRepositoryService userService, ServletContext servletContext) {
        this.userService = userService;
    }

//    @GetMapping("/test/admin")
//    public List<User> findAll() throws Exception {
//        return userService.getAll();
//    }
//
//    @GetMapping()
//    public String message() {
//        log.info("message!");
//        return "Works";
//    }
//
//    @GetMapping("/test")
//    public User findByLogin() throws Exception {
//        return userService.getUserByLogin("test");
//    }
}

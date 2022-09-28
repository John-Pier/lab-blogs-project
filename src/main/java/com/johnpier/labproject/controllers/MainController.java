package com.johnpier.labproject.controllers;

import com.johnpier.labproject.configs.Constants;
import com.johnpier.labproject.entities.User;
import com.johnpier.labproject.services.UserRepositoryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletContext;
import java.util.List;

@RestController
@Slf4j
@RequestMapping(Constants.API_VERSION)
@CrossOrigin(origins = "*", maxAge = 4800, methods = {RequestMethod.POST, RequestMethod.GET, RequestMethod.PUT}, allowedHeaders = "*")
public class MainController {
    private final UserRepositoryService userService;

    public MainController(UserRepositoryService userService, ServletContext servletContext) {
        this.userService = userService;
    }

    @GetMapping("/test/admin")
    public List<User> findAll() throws Exception {
        return userService.getAll();
    }

    @GetMapping()
    public String message() {
        log.info("message!");
        return "Works";
    }

    @GetMapping("/test")
    public User findByLogin() throws Exception {
        return userService.getUserByLogin("test");
    }

    @PostMapping(path = "/registration")
    public ResponseEntity<?> addPerson(@RequestBody User user) {
        userService.createUser(user);
//        final UserDetails userDetails = userDetailsService
//                .loadUserByUsername(user.getLogin());
//        log.info("Token returned");
//
//        userTaskRepositoryService.initUserTask(userService.getUserByLogin(user.getLogin()).getUuid());

        log.info("Init actions succeeded");
        return ResponseEntity.ok("ok");
    }
}

package com.johnpier.labproject.controllers;

import com.johnpier.labproject.configs.*;
import com.johnpier.labproject.services.UserRepositoryService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletContext;

@RestController
@Slf4j
@CrossOrigin
@AllArgsConstructor
@RequestMapping(path = Routes.ADMIN)
public class MainController {
    private final UserRepositoryService userService;

    @GetMapping(value = "/health")
    public String message() {
        log.info("message!");
        return "Works";
    }
}

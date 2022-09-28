package com.johnpier.labproject.controllers;

import com.johnpier.labproject.auth.JwtTokenUtil;
import com.johnpier.labproject.configs.Constants;
import com.johnpier.labproject.models.UserProfileDto;
import com.johnpier.labproject.services.UserRepositoryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@CrossOrigin
@RequestMapping(Constants.API_VERSION)
public class UserController {
    private final UserRepositoryService userRepositoryService;

    public UserController(UserRepositoryService userRepositoryService) {
        this.userRepositoryService = userRepositoryService;
    }

    @GetMapping("/user")
    public UserProfileDto getUserByLogin(@RequestHeader("Authorization") String token) {
        JwtTokenUtil jwtTokenUtil = new JwtTokenUtil();
        String login = jwtTokenUtil.getUsernameFromToken(token.substring(7)); // TODO
        log.info("GET /user:  login - " + login);
        return userRepositoryService.getUserProfileByLogin(login);
    }
}

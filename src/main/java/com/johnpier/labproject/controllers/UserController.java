package com.johnpier.labproject.controllers;

import com.johnpier.labproject.configs.Constants;
import com.johnpier.labproject.models.UserProfile;
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

//    @GetMapping("/user")
//    public UserProfile getUserByLogin(@RequestHeader("Authorization") String token) {
//        JwtTokenUtil jwtTokenUtil = new JwtTokenUtil();
//        String login = jwtTokenUtil.getUsernameFromToken(token.substring(7));
//        log.info("Get user: "+ login);
//        return userRepositoryService.getUserProfileByLogin(login);
//    }
}

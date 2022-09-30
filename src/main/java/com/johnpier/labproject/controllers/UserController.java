package com.johnpier.labproject.controllers;

import com.johnpier.labproject.auth.JwtTokenUtil;
import com.johnpier.labproject.configs.Routes;
import com.johnpier.labproject.models.*;
import com.johnpier.labproject.services.UserRepositoryService;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@CrossOrigin
@RequestMapping(Routes.USERS)
public class UserController {
    private final UserRepositoryService userRepositoryService;

    public UserController(UserRepositoryService userRepositoryService) {
        this.userRepositoryService = userRepositoryService;
    }

    @GetMapping("")
    public UserProfileDto getUserByToken(@RequestHeader("Authorization") String token) {
        JwtTokenUtil jwtTokenUtil = new JwtTokenUtil();
        String login = jwtTokenUtil.getUsernameFromToken(token.substring(7)); // TODO
        log.info("GET /user:  login - " + login);
        return userRepositoryService.getUserProfileByLogin(login);
    }


    @GetMapping("/:login")
    public UserProfileDto getUserByLogin(@RequestParam("login") String login) {
        log.info("GET /user/login: " + login);
        return userRepositoryService.getUserProfileByLogin(login);
    }

    @PostMapping("/search")
    public ResponseEntity<?> searchUsers(@RequestBody UserSearchParams userSearchParams) throws Exception {
        if (userSearchParams == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error model!");
        }

        if (userSearchParams.login != null) {
            ResponseEntity.ok(userRepositoryService.getUserProfileByLogin(userSearchParams.login));
        }

        if (userSearchParams.logins != null && !userSearchParams.logins.isEmpty()) {
            ResponseEntity.ok(userRepositoryService.searchUserProfilesByLogins(userSearchParams.logins));
        }

        return ResponseEntity.badRequest().body("No recognized params");
    }

    @PostMapping("")
    public UserProfileDto updateUser(@RequestBody UserWithCredentialsDto userProfile) throws Exception {
        return userRepositoryService.saveUser(userProfile);
    }


    @Data
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    private class UserSearchParams {
        private List<String> logins;
        private String login;
        private String firstName;
    }
}

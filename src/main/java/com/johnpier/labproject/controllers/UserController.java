package com.johnpier.labproject.controllers;

import com.johnpier.labproject.configs.Routes;
import com.johnpier.labproject.models.*;
import com.johnpier.labproject.services.UserRepositoryService;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@Slf4j
@AllArgsConstructor
@RequestMapping(path = Routes.USERS)
public class UserController {
    private UserRepositoryService userRepositoryService;

    @Secured("ADMIN")
    @GetMapping(value = "/{login}")
    public UserProfileDto getUserByLogin(@PathVariable String login) {
        log.warn("login: " + login);
        return userRepositoryService.getUserProfileByLogin(login);
    }

    @Secured("MODERATOR")
    @PostMapping(value = "/search")
    public ResponseEntity<?> searchUsers(@RequestBody UserSearchParams userSearchParams) throws Exception {
        if (userSearchParams == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error model!");
        }

        if (userSearchParams.login != null) {
            ResponseEntity.ok(userRepositoryService.getUserProfileByLogin(userSearchParams.login));
        }

        if (userSearchParams.firstName != null) {
            ResponseEntity.ok(userSearchParams.firstName); // TODO
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
    private static class UserSearchParams {
        private List<String> logins;
        private String login;
        private String firstName;
    }
}

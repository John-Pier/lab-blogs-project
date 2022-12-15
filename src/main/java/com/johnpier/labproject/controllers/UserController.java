package com.johnpier.labproject.controllers;

import com.johnpier.labproject.auth.JwtTokenUtil;
import com.johnpier.labproject.configs.Routes;
import com.johnpier.labproject.models.*;
import com.johnpier.labproject.services.UserRepositoryService;
import com.johnpier.labproject.utils.UserRoles;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin
@Slf4j
@AllArgsConstructor
@RequestMapping(path = Routes.USERS)
public class UserController {
    private UserRepositoryService userRepositoryService;
    private final JwtTokenUtil jwtTokenUtil;

    @GetMapping(value = "/{login}")
    public ResponseEntity<?> getUserByLogin(@PathVariable String login, @RequestHeader("Authorization") String auth) {
        log.warn("login: " + login);
        var token = JwtTokenUtil.getBearerToken(auth);
        var tokenLogin = jwtTokenUtil.getUsernameFromToken(token);
        var roles = jwtTokenUtil.getUserRoleFromToken(token);
        if (!Objects.equals(tokenLogin, login) && !UserRoles.isModeratorAccess(roles)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }
        return ResponseEntity.ok(userRepositoryService.getUserProfileByLogin(login));
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

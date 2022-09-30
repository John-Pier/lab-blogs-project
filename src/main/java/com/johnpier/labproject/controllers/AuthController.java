package com.johnpier.labproject.controllers;

import com.johnpier.labproject.configs.Routes;
import com.johnpier.labproject.models.*;
import com.johnpier.labproject.services.UserRepositoryService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@Slf4j
@AllArgsConstructor
@RequestMapping(Routes.AUTH)
public class AuthController {
    private AuthenticationManager authenticationManager;
    private UserRepositoryService userRepositoryService;

    @PostMapping()
    public ResponseEntity<UserProfileDto> createAuthenticationToken(@RequestBody UserAuthDto userAuthDto) throws Exception {
        authenticate(userAuthDto.getLogin(), userAuthDto.getPassword());
        final var userProfileDto = userRepositoryService.getUserProfileByLogin(userAuthDto.getLogin());

        log.info("User auth success" + userProfileDto.getFirstName());
        return ResponseEntity.ok(userProfileDto);
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        } catch (AuthenticationException e) {
            throw new Exception("AUTH_ERROR", e);
        }
    }
}

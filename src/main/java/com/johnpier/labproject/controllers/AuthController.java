package com.johnpier.labproject.controllers;

import com.johnpier.labproject.auth.JwtTokenUtil;
import com.johnpier.labproject.configs.Routes;
import com.johnpier.labproject.models.*;
import com.johnpier.labproject.services.*;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationContext;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.*;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@RestController
@CrossOrigin
@Slf4j
@AllArgsConstructor
@RequestMapping(path = Routes.AUTH)
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final UserRepositoryService userRepositoryService;
    private final ApplicationContext applicationContext;
    private final DefaultUserDetailsService jwtUserDetailsService;
    private final JwtTokenUtil jwtTokenUtil;

    @PostMapping()
    public ResponseEntity<?> authenticateUser(@RequestBody UserAuthDto userAuthDto, HttpServletResponse response) throws Exception {
        try {
          authenticate(userAuthDto.getLogin(), userAuthDto.getPassword());
        } catch (Exception ex) {
            return ResponseEntity.status(400).body(ex.getMessage());
        }

        setAuthHeader(response, userAuthDto.getLogin());

        return ResponseEntity.ok(userRepositoryService.getUserProfileByLogin(userAuthDto.getLogin()));
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED");
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS");
        } catch (AuthenticationException e) {
            throw new Exception("AUTH_ERROR");
        }
    }

    private void setAuthHeader(HttpServletResponse response, String login) {
        var userDetails = this.jwtUserDetailsService.loadUserByUsername(login);
        response.setHeader("Authorization", JwtTokenUtil.toBearerToken(jwtTokenUtil.generateToken(userDetails)));
    }
}

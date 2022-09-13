package com.johnpier.labproject.controllers;

import com.johnpier.labproject.configs.Constants;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

//@RestController
//@CrossOrigin
//@Slf4j
//@RequestMapping(Constants.API_VERSION)
//public class JwtAuthenticationController {
//    @Autowired
//    private AuthenticationManager authenticationManager;
//    @Autowired
//    private JwtTokenUtil jwtTokenUtil;
//    @Autowired
//    private UserDetailsServiceImpl userDetailsService;
//
//    @PostMapping(path = "/authenticate")
//    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {
//        authenticate(authenticationRequest.getLogin(), authenticationRequest.getPassword());
//        log.info(authenticationRequest.getLogin());
//        log.info(authenticationRequest.getPassword());
//        final UserDetails userDetails = userDetailsService
//                .loadUserByUsername(authenticationRequest.getLogin());
//        final String token = jwtTokenUtil.generateToken(userDetails);
//        return ResponseEntity.ok(new JwtResponse(token));
//    }
//
//    @GetMapping(path = "/authenticates")
//    public String message() {
//        return "NICE BALLS";
//    }
//
//    private void authenticate(String username, String password) throws Exception {
//        log.info(username);
//        log.info(password);
//        try {
//            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
//        } catch (DisabledException e) {
//            throw new Exception("USER_DISABLED", e);
//        } catch (BadCredentialsException e) {
//            throw new Exception("INVALID_CREDENTIALS", e);
//        }
//    }
//}

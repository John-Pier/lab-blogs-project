package com.johnpier.labproject.controllers;

import com.johnpier.labproject.auth.JwtTokenUtil;
import com.johnpier.labproject.configs.Routes;
import com.johnpier.labproject.models.*;
import com.johnpier.labproject.services.*;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@Slf4j
@AllArgsConstructor
@RequestMapping(Routes.AUTH)
public class JwtAuthenticationController {
    private AuthenticationManager authenticationManager;
    private JwtTokenUtil jwtTokenUtil;
    private DefaultUserDetailsService userDetailsService;
    private UserRepositoryService userRepositoryService;

    @PostMapping()
    public ResponseEntity<UserProfileDto> createAuthenticationToken(@RequestBody UserAuthDto userAuthDto) throws Exception {
        authenticate(userAuthDto.getLogin(), userAuthDto.getPassword());
        log.info(userAuthDto.getLogin());
        log.info(userAuthDto.getPassword());
//        final UserDetails userDetails = userDetailsService
//                .loadUserByUsername(userAuthDto.getLogin());
//        final String token = jwtTokenUtil.generateToken(userDetails);

        final UserProfileDto userProfileDto = userRepositoryService.getUserProfileByLogin(userAuthDto.getLogin());
        return ResponseEntity.ok(userProfileDto);
    }

    private void authenticate(String username, String password) throws Exception {
        log.info(username);
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }
}

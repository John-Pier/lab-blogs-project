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
@RequestMapping(Routes.AUTH)
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final UserRepositoryService userRepositoryService;
    private final ApplicationContext applicationContext;
    private final DefaultUserDetailsService jwtUserDetailsService;

    @PostMapping()
    public ResponseEntity<UserProfileDto> createAuthenticationToken(@RequestBody UserAuthDto userAuthDto, HttpServletResponse response) throws Exception {
        var authentication = authenticate(userAuthDto.getLogin(), userAuthDto.getPassword());

        var userDetails = this.jwtUserDetailsService.loadUserByUsername(userAuthDto.getLogin());
        // TODO: сократить до одного запроса к базе
        final var userProfileDto = userRepositoryService.getUserProfileByLogin(userAuthDto.getLogin());

        log.info("User auth success" + userProfileDto.getFirstName());

        var jwtTokenUtil = applicationContext.getBean(JwtTokenUtil.class);
        response.setHeader("Authorization", JwtTokenUtil.toBearerToken(jwtTokenUtil.generateToken(userDetails)));
        return ResponseEntity.ok(userProfileDto);
    }

    private Authentication authenticate(String username, String password) throws Exception {
        try {
            // TODO: error usage
            return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED");
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS");
        } catch (AuthenticationException e) {
            throw new Exception("AUTH_ERROR");
        }
    }
}

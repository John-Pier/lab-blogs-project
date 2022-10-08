package com.johnpier.labproject.controllers;

import com.johnpier.labproject.configs.Routes;
import com.johnpier.labproject.controllers.validators.UserDtoValidators;
import com.johnpier.labproject.models.*;
import com.johnpier.labproject.services.UserRepositoryService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@AllArgsConstructor
@CrossOrigin
@RequestMapping(value = Routes.REGISTER)
public class RegistrationController {
    private UserRepositoryService userService;

    @PostMapping()
    public ResponseEntity<?> addPerson(@RequestBody UserWithCredentialsDto userWithCredentialsDto) {
        UserProfileDto userProfileDto = null;

        try {
            UserDtoValidators.validate(userWithCredentialsDto);
            userProfileDto = userService.createUser(userWithCredentialsDto);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }

        return ResponseEntity.ok(userProfileDto);
    }
}

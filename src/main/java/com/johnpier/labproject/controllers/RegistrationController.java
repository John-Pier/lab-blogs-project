package com.johnpier.labproject.controllers;

import com.johnpier.labproject.configs.Routes;
import com.johnpier.labproject.controllers.validators.RegistrationValidators;
import com.johnpier.labproject.models.*;
import com.johnpier.labproject.services.UserRepositoryService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@Slf4j
@AllArgsConstructor
@RequestMapping(Routes.REGISTER)
@CrossOrigin(origins = "*", maxAge = 4800, methods = {RequestMethod.POST, RequestMethod.GET, RequestMethod.PUT}, allowedHeaders = "*")
public class RegistrationController {
    private UserRepositoryService userService;

    @PostMapping()
    public ResponseEntity<?> addPerson(@RequestBody UserWithCredentialsDto userWithCredentialsDto) {
        UserProfileDto userProfileDto = null;

        try {
            RegistrationValidators.validate(userWithCredentialsDto);
            userProfileDto = userService.createUser(userWithCredentialsDto);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }

        return ResponseEntity.ok(userProfileDto);
    }
}

package com.johnpier.labproject.controllers.validators;

import com.johnpier.labproject.models.*;

import java.time.LocalDate;

public class UserDtoValidators {
    final private static LocalDate maxBirthDate = LocalDate.of(1920, 1, 1);

    public static boolean validate(UserProfileDto userProfile) throws Exception {
        if (userProfile == null) {
            throw new Exception("Invalid model!");
        }
        return true;
    }

    public static boolean validate(UserWithCredentialsDto userWithCredentials) throws Exception {
        if (userWithCredentials == null) {
            throw new Exception("Invalid model!");
        }

        if (userWithCredentials.getLogin() == null || userWithCredentials.getPassword() == null) {
            throw new Exception("Invalid model!");
        }

//        if (userWithCredentials.)

        if (userWithCredentials.getEmail() == null) {
            throw new Exception("Email is required!");
        }

        if (userWithCredentials.getBirthDate() != null && userWithCredentials.getBirthDate().compareTo(maxBirthDate) < 0) {
            throw new Exception("Invalid birth date!");
        }

        return true;
    }
}

package com.johnpier.labproject.controllers.validators;

import com.johnpier.labproject.models.*;

public class RegistrationValidators {
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
        return true;
    }
}

package com.johnpier.labproject.models;

import lombok.Data;

@Data
public class UserProfile {
    private String firstName;
    private String secondName;
    private String email;
    private String country;
    private String city;
}

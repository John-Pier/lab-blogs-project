package com.johnpier.labproject.models;

import lombok.*;

import java.util.Date;

@lombok.Data
@Getter
@Setter
@AllArgsConstructor
@EqualsAndHashCode
public class UserProfile {
    private String firstName;
    private String secondName;
    private String email;
    private String country;
    private String city;
    private Byte gender;
    private Date birthday;
}

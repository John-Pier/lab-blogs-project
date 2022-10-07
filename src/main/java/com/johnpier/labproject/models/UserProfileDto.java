package com.johnpier.labproject.models;

import lombok.*;

import java.time.LocalDate;

@lombok.Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class UserProfileDto {
    private String login;
    private String firstName;
    private String secondName;
    private String email;
    private String country;
    private String city;
    private Byte gender;
    private LocalDate birthDate;
    private String userRole;
}

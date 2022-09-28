package com.johnpier.labproject.models;

import lombok.*;

import java.util.*;

@lombok.Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class UserProfileDto {
    private String firstName;
    private String secondName;
    private String email;
    private String country;
    private String city;
    private Byte gender;
    private Date birthday;
    private List<UserRolePermissionsDto> roles;
}

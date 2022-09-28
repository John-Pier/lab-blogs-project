package com.johnpier.labproject.models;

import lombok.*;

@lombok.Data
@Getter
@Setter
@EqualsAndHashCode(callSuper = true)
public class UserWithCredentialsDto extends UserProfileDto {
    private String login;
    private String password;
}

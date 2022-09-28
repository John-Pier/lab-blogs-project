package com.johnpier.labproject.models;

import lombok.*;

@lombok.Data
@Getter
@Setter
public class UserAuthDto {
    private String login;
    private String password;
}

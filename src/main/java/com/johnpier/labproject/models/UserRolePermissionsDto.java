package com.johnpier.labproject.models;


import lombok.*;

@lombok.Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class UserRolePermissionsDto {
    private String name;
    private Byte permissions;
}

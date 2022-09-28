package com.johnpier.labproject.models;


import com.johnpier.labproject.entities.UserRole;
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

    public static UserRolePermissionsDto from(UserRole userRole) {
        final UserRolePermissionsDto userRolePermissions = new UserRolePermissionsDto();
        userRolePermissions.setPermissions(userRole.getPermissions());
        userRolePermissions.setName(userRole.getName());
        return userRolePermissions;
    }
}

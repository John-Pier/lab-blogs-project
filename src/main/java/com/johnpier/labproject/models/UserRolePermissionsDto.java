package com.johnpier.labproject.models;


import com.johnpier.labproject.entities.NamedUserRole;
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

    public static UserRolePermissionsDto from(NamedUserRole namedUserRole) {
        final UserRolePermissionsDto userRolePermissions = new UserRolePermissionsDto();
        userRolePermissions.setPermissions(namedUserRole.getPermissions());
        userRolePermissions.setName(namedUserRole.getName());
        return userRolePermissions;
    }
}

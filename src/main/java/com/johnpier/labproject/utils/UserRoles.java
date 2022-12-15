package com.johnpier.labproject.utils;

import com.johnpier.labproject.entities.enums.UserRole;

import java.util.List;

public class UserRoles {
    public static boolean isModeratorAccess(List<UserRole> roles) {
        return roles.contains(UserRole.MODERATOR) || roles.contains(UserRole.ADMIN);
    }

    public static boolean isAdminAccess(List<UserRole> roles) {
        return roles.contains(UserRole.ADMIN);
    }
}

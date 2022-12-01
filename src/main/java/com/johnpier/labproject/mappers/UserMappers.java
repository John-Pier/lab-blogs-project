package com.johnpier.labproject.mappers;

import com.johnpier.labproject.entities.User;
import com.johnpier.labproject.entities.enums.UserRole;
import com.johnpier.labproject.models.*;

public class UserMappers {
    public static String mapUserRoleToString(UserRole userRole) {
        switch (userRole) {
            case ADMIN:
                return UserRole.ADMIN.name();
            case MODERATOR:
                return UserRole.MODERATOR.name();
            default:
                return UserRole.USER.name();
        }
    }

    public static UserRole mapToUserRole(String userRole) {
        if (userRole == null) {
            return UserRole.USER;
        }

        try {
            return UserRole.valueOf(userRole);
        } catch (Exception e) {
            return UserRole.USER;
        }
    }

    public static User mapFromUserWithCredentials(UserWithCredentialsDto userWithCredentials) {
        if (userWithCredentials == null) {
            return null;
        }
        final var user = new User();
        user.setLogin(userWithCredentials.getLogin());
        user.setPassword(userWithCredentials.getPassword());
        user.setBirthDate(userWithCredentials.getBirthDate());
        user.setGender(userWithCredentials.getGender());
        user.setCity(userWithCredentials.getCity());
        user.setCountry(userWithCredentials.getCountry());
        user.setEmail(userWithCredentials.getEmail());
        user.setFirstName(userWithCredentials.getFirstName());
        user.setSecondName(userWithCredentials.getSecondName());
        user.setUsersRole(mapToUserRole(userWithCredentials.getUserRole()));
        return user;
    }

    public static UserProfileDto mapUserToUserProfileDto(User user) {
        if (user == null) {
            return null;
        }
        final var userProfileDto = new UserProfileDto();
        userProfileDto.setId(user.getUuid());
        userProfileDto.setLogin(user.getLogin());
        userProfileDto.setEmail(user.getEmail());
        userProfileDto.setBirthDate(user.getBirthDate());
        userProfileDto.setCity(user.getCity());
        userProfileDto.setCountry(user.getCountry());
        userProfileDto.setFirstName(user.getFirstName());
        userProfileDto.setSecondName(user.getSecondName());
        userProfileDto.setGender(user.getGender());
        userProfileDto.setUserRole(mapUserRoleToString(user.getUsersRole()));

        return userProfileDto;
    }

    public static ShortUserDto mapUserToShortUserDto(User user) {
        final var shortUser = new ShortUserDto();

        shortUser.setId(user.getUuid());
        shortUser.setFirstName(user.getFirstName());
        shortUser.setSecondName(user.getSecondName());
        shortUser.setCity(user.getCity());
        shortUser.setGender(user.getGender());

        return shortUser;
    }
}

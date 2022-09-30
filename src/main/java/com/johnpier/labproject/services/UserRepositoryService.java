package com.johnpier.labproject.services;

import com.johnpier.labproject.entities.User;
import com.johnpier.labproject.models.*;
import com.johnpier.labproject.repositories.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
public class UserRepositoryService {
    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
    private final UserRepository repository;

    @Autowired
    public UserRepositoryService(UserRepository repository) {
        this.repository = repository;
    }

    public User getUserByLogin(String login) {
        User user = repository.getUserByLogin(login);
        System.out.println(user.getLogin());
        return user;
    }

    public boolean isUserExistsByLogin(String login) {
        return repository.getUserByLogin(login) == null;
    }

    public boolean isUserExistsByEmail(String email) {
        return repository.getUserByEmail(email) == null;
    }

    public UserProfileDto saveUser(UserWithCredentialsDto user) throws Exception {
        User userFromDB = repository.getUserByLogin(user.getLogin());
        if (userFromDB == null) {
            throw new Exception("User not found!");
        }

        log.info("Save user: " + user.getLogin() + ":" + user.getPassword());
        log.info(bCryptPasswordEncoder.encode(user.getPassword()));

        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));

        return mapUserToUserProfileDto(repository.save(mapFromUserWithCredentials(user)));
    }

    public UserProfileDto createUser(UserWithCredentialsDto userWithCredentials) throws Exception {
        if (isUserExistsByLogin(userWithCredentials.getLogin())) {
            throw new Exception("User Already Exist!");
        }

        if (userWithCredentials.getEmail() != null && isUserExistsByEmail(userWithCredentials.getEmail())) {
            throw new Exception("User email Already Exist!");
        }

        userWithCredentials.setPassword(bCryptPasswordEncoder.encode(userWithCredentials.getPassword()));
        return mapUserToUserProfileDto(repository.save(mapFromUserWithCredentials(userWithCredentials)));
    }

    public List<UserProfileDto> searchUserProfilesByLogins(List<String> logins) {
//        return repository.findBy(UserProfileDto.class, )
        return new ArrayList<>(0);
    }

    public UserProfileDto getUserProfileByLogin(String login) {
        User user = repository.getUserByLogin(login);
        log.info("Map userProfile model");

        UserProfileDto userProfile = new UserProfileDto();
        userProfile.setLogin(user.getLogin());
        userProfile.setCity(user.getCity());
        userProfile.setEmail(user.getEmail());
        userProfile.setCountry(user.getCountry());
        userProfile.setFirstName(user.getFirstName());
        userProfile.setSecondName(user.getSecondName());
        userProfile.setGender(user.getGender());
        userProfile.setBirthDate(user.getBirthDate());
        return userProfile;
    }


    private User mapFromUserWithCredentials(UserWithCredentialsDto userWithCredentials) {
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
        return user;
    }

    private UserProfileDto mapUserToUserProfileDto(User user) {
        final var userProfileDto = new UserProfileDto();
        userProfileDto.setEmail(user.getEmail());
        userProfileDto.setBirthDate(user.getBirthDate());
        userProfileDto.setCity(user.getCity());
        userProfileDto.setCountry(user.getCountry());
        userProfileDto.setFirstName(user.getFirstName());
        userProfileDto.setSecondName(user.getSecondName());
        userProfileDto.setGender(user.getGender());
        if (user.getRoles() != null) {
            var roles = user.getRoles().stream().map(UserRolePermissionsDto::from).collect(Collectors.toList());
            userProfileDto.setRoles(roles);
        }

        return userProfileDto;
    }
}

package com.johnpier.labproject.services;

import com.johnpier.labproject.entities.User;
import com.johnpier.labproject.mappers.UserMappers;
import com.johnpier.labproject.models.*;
import com.johnpier.labproject.repositories.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

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
        return repository.getUserByLogin(login) != null;
    }

    public boolean isUserExistsByEmail(String email) {
        return repository.getUserByEmail(email) != null;
    }

    public UserProfileDto saveUser(UserWithCredentialsDto user) throws Exception {
        User userFromDB = repository.getUserByLogin(user.getLogin());
        if (userFromDB == null) {
            throw new Exception("User not found!");
        }

        log.info("Save user: " + user.getLogin() + ":" + user.getPassword());
        log.info(bCryptPasswordEncoder.encode(user.getPassword()));

        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));

        return UserMappers.mapUserToUserProfileDto(repository.save(UserMappers.mapFromUserWithCredentials(user)));
    }

    public UserProfileDto createUser(UserWithCredentialsDto userWithCredentials) throws Exception {
        if (isUserExistsByLogin(userWithCredentials.getLogin())) {
            throw new Exception("User Already Exist!");
        }

        if (userWithCredentials.getEmail() != null && isUserExistsByEmail(userWithCredentials.getEmail())) {
            throw new Exception("User email Already Exist!");
        }

        userWithCredentials.setPassword(bCryptPasswordEncoder.encode(userWithCredentials.getPassword()));
        return UserMappers.mapUserToUserProfileDto(repository.save(UserMappers.mapFromUserWithCredentials(userWithCredentials)));
    }

    public List<UserProfileDto> searchUserProfilesByLogins(List<String> logins) {
//        return repository.findBy(UserProfileDto.class, )
        return new ArrayList<>(0);
    }

    public UserProfileDto getUserProfileByLogin(String login) {
        var user = repository.getUserByLogin(login);
        log.info("Map userProfile model");
        return UserMappers.mapUserToUserProfileDto(user);
    }
}

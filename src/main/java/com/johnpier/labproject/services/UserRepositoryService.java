package com.johnpier.labproject.services;

import com.johnpier.labproject.entities.User;
import com.johnpier.labproject.models.UserProfile;
import com.johnpier.labproject.repositories.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class UserRepositoryService {

    private BCryptPasswordEncoder bCryptPasswordEncoder;

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

    public List<User> getAll() {
        log.info("get all users");
        return repository.findAll();
    }

    public User getUserByEmail(String email) {
        return this.repository.findAllByEmail(email);
    }

    public boolean isUserExistsByLogin(String login) {
        return repository.getUserByLogin(login) == null;
    }

    public boolean saveUser(User user) {
        User userFromDB = repository.getUserByLogin(user.getLogin());
        if (userFromDB == null) {
            return false;
        }

        log.info(user.getPassword());
        log.info(new BCryptPasswordEncoder().encode(user.getPassword()));

        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        repository.save(user);
        return true;
    }

    public User createUser(User user) {
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        log.info(user.getPassword());

        return repository.save(user);
    }

    public String getFirstNameByLogin(String login) {
        return this.getUserByLogin(login).getFirstName();
    }

    public UserProfile getUserProfileByLogin(String login) {
        User user = repository.getUserByLogin(login);
        log.info("Map userProfile model");

        UserProfile userProfile = new UserProfile();
        userProfile.setCity(user.getCity());
        userProfile.setEmail(user.getEmail());
        userProfile.setCountry(user.getCountry());
        userProfile.setFirstName(user.getFirstName());
        userProfile.setSecondName(user.getSecondName());
        return userProfile;
    }
}

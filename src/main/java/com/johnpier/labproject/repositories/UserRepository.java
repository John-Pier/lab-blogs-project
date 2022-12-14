package com.johnpier.labproject.repositories;

import com.johnpier.labproject.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    User getUserByLogin(String login);

    User getUserByEmail(String email);
}

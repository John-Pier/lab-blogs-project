package com.johnpier.labproject.services;

import com.johnpier.labproject.entities.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.HashSet;

@Service
@Slf4j
@AllArgsConstructor
public class DefaultUserDetailsService implements UserDetailsService {
    private UserRepositoryService userRepositoryService;

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        var user = userRepositoryService.getUserByLogin(login);

        if (user == null) {
            throw new UsernameNotFoundException("User or password invalid");
        }

        var roles = new HashSet<GrantedAuthority>();
        var role = user.getUsersRole();
        if (role == UserRole.ADMIN || role == UserRole.MODERATOR) {
            roles.add(new SimpleGrantedAuthority(role.name()));
            roles.add(new SimpleGrantedAuthority(UserRole.USER.name()));
        } else {
            roles.add(new SimpleGrantedAuthority(role.name()));
        }

        return new org.springframework.security.core.userdetails.User(user.getLogin(), user.getPassword(), roles);
    }
}

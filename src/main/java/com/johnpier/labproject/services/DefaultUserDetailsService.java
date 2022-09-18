package com.johnpier.labproject.services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import com.johnpier.labproject.entities.User;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Slf4j
public class DefaultUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepositoryService userRepositoryService;

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        User user = userRepositoryService.getUserByLogin(login);

        if (user == null) {
            throw new UsernameNotFoundException("User or password invalid");
        }

        var roles = new HashSet<GrantedAuthority>();
//        if (user.getAdmin()) {
//            roles.add(new SimpleGrantedAuthority(UserRoleEnum.ROLE_ADMIN.name()));
//            roles.add(new SimpleGrantedAuthority(UserRoleEnum.ROLE_USER.name()));
//            log.info("1");
//        }
//        else {
            roles.add(new SimpleGrantedAuthority("ROLE_USER"));
//            log.info("2");
//        }

        return new org.springframework.security.core.userdetails.User(user.getLogin(),
                user.getPassword(),
                roles);
    }

}

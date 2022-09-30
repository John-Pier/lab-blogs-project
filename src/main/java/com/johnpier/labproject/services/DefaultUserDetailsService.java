package com.johnpier.labproject.services;

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

    public String getFirstNameByLogin(String login) {
        var user = userRepositoryService.getUserProfileByLogin(login);

        if (user == null) {
            throw new UsernameNotFoundException("User or password invalid");
        }

        // TODO: return all params
        return user.getFirstName();
    }
}

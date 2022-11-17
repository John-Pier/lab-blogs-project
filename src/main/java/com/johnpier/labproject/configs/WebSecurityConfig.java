package com.johnpier.labproject.configs;

import com.johnpier.labproject.auth.*;
import com.johnpier.labproject.services.DefaultUserDetailsService;
import org.springframework.context.annotation.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.*;

import java.util.Arrays;

@Configuration
public class WebSecurityConfig {

    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtRequestFilter jwtRequestFilter;
    private final DefaultUserDetailsService userDetailsService;

    public WebSecurityConfig(JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint, DefaultUserDetailsService userDetailsService, JwtRequestFilter jwtRequestFilter) {
        this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
        this.userDetailsService = userDetailsService;
        this.jwtRequestFilter = jwtRequestFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors()
                .and()
                .csrf().disable() // TODO: fix
                .exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint).and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().authorizeRequests().antMatchers(Routes.ADMIN + Paths.Any).access("hasAnyRole('ADMIN', 'MODERATOR')").antMatchers(Routes.AUTH, Routes.REGISTER, Routes.ROOT).permitAll().anyRequest().authenticated().and().logout().logoutUrl(Routes.LOGOUT).clearAuthentication(true).logoutSuccessUrl(Routes.ROOT)
                .invalidateHttpSession(true)
                .and()
                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

        http.authenticationProvider(authenticationProvider());

        return http.build();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().antMatchers(Paths.Index, Paths.Css, Paths.Js, Routes.ASSETS, Paths.Icon);
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        var configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("*"); // TODO: fix
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "OPTION"));
        // configuration.setAllowCredentials(true);
        configuration.setAllowedHeaders(Arrays.asList(
                "Access-Control-Allow-Headers",
                "Access-Control-Allow-Origin",
                "Access-Control-Request-Method",
                "Access-Control-Request-Headers",
                "Origin",
                "Cache-Control",
                "Content-Type",
                "Authorization"
        ));
        var configurationSource = new UrlBasedCorsConfigurationSource();
        configurationSource.registerCorsConfiguration(Constants.API_VERSION + "/**", configuration);
        return configurationSource;
    }

    @Bean
    public PasswordEncoder getBCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(getBCryptPasswordEncoder());

        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfiguration) throws Exception {
        return authConfiguration.getAuthenticationManager();
    }
}

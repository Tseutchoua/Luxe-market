package com.ecommerce.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Disable CSRF for simple APIs
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/products/**").permitAll() // Public: View products
                        .requestMatchers("/api/auth/**").permitAll()     // Public: Login/Register
                        .requestMatchers("/api/orders/**").permitAll()
                        .requestMatchers("/api/payment/**").permitAll()
                        .requestMatchers("/api/wishlist/**").permitAll()
                        .requestMatchers("/api/coupons/**").permitAll()
                        .requestMatchers("/api/reviews/**").permitAll()
                        .requestMatchers("/api/admin/**").permitAll()
                        .requestMatchers("/api/images/**").permitAll()
                        .requestMatchers("/images/**").permitAll()
                        .anyRequest().authenticated()                    // Private: Everything else
                );

        return http.build();
    }

    // This tool encrypts passwords so they are safe in the database
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
package com.ecommerce.backend.repositories;

import com.ecommerce.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    // This helps us find a user when they try to log in
}
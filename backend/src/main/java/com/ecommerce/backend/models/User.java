package com.ecommerce.backend.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true) // No two users can have the same email
    private String email;

    private String password; // Will be encrypted (e.g., $2a$10$...)

    private String name;

    private String role; // "USER" or "ADMIN"
}
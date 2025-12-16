package com.ecommerce.backend.models;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;

@Entity
@Data
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(length = 1000) // Allows longer text
    private String description;

    private BigDecimal price;

    private String category;
    private Integer stockQuantity;

    private String imageUrl; // We will store the link to the image
}
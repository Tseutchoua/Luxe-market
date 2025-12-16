package com.ecommerce.backend.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "coupons")
public class Coupon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String code; // e.g. "SAVE20"

    private int discountPercentage; // e.g. 20

    private boolean active; // To enable/disable codes
}
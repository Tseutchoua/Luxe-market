package com.ecommerce.backend.models;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "customer_orders") // "order" is a reserved SQL word, so we use "customer_orders"
public class UserOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userEmail; // We link the order to the user's email

    private BigDecimal totalAmount;

    private String status; // e.g., "PENDING", "PAID"

    private LocalDateTime orderDate;

    // We strictly define this to automatically set the date when saving
    @PrePersist
    protected void onCreate() {
        orderDate = LocalDateTime.now();
    }
}
package com.ecommerce.backend.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "wishlist_items")
public class WishlistItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;     // Who liked it?

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product; // What did they like?
}
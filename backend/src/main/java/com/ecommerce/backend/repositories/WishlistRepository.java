package com.ecommerce.backend.repositories;

import com.ecommerce.backend.models.WishlistItem;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface WishlistRepository extends JpaRepository<WishlistItem, Long> {
    // Find all items for a specific user
    List<WishlistItem> findByUserId(Long userId);

    // Check if a specific user already liked a specific product
    Optional<WishlistItem> findByUserIdAndProductId(Long userId, Long productId);
}
package com.ecommerce.backend.repositories;

import com.ecommerce.backend.models.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    // Find reviews for a specific product
    List<Review> findByProductIdOrderByDateDesc(Long productId);
}
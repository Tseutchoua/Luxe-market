package com.ecommerce.backend.controllers;

import com.ecommerce.backend.models.Review;
import com.ecommerce.backend.repositories.ReviewRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "http://localhost:3000")
public class ReviewController {

    private final ReviewRepository reviewRepository;

    public ReviewController(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    // 1. Get reviews for a product
    @GetMapping("/{productId}")
    public List<Review> getProductReviews(@PathVariable Long productId) {
        return reviewRepository.findByProductIdOrderByDateDesc(productId);
    }

    // 2. Add a review
    @PostMapping
    public Review addReview(@RequestBody Review review) {
        return reviewRepository.save(review);
    }
}
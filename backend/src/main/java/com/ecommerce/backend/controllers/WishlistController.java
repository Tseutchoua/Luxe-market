package com.ecommerce.backend.controllers;

import com.ecommerce.backend.models.Product;
import com.ecommerce.backend.models.WishlistItem;
import com.ecommerce.backend.repositories.ProductRepository;
import com.ecommerce.backend.repositories.WishlistRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/wishlist")
@CrossOrigin(origins = "http://localhost:3000")
public class WishlistController {

    private final WishlistRepository wishlistRepository;
    private final ProductRepository productRepository;

    public WishlistController(WishlistRepository wishlistRepository, ProductRepository productRepository) {
        this.wishlistRepository = wishlistRepository;
        this.productRepository = productRepository;
    }

    // 1. Get user's wishlist
    @GetMapping("/{userId}")
    public List<WishlistItem> getUserWishlist(@PathVariable Long userId) {
        return wishlistRepository.findByUserId(userId);
    }

    // 2. Toggle (Add or Remove)
    @PostMapping("/toggle")
    public String toggleWishlist(@RequestBody Map<String, Long> payload) {
        Long userId = payload.get("userId");
        Long productId = payload.get("productId");

        Optional<WishlistItem> existing = wishlistRepository.findByUserIdAndProductId(userId, productId);

        if (existing.isPresent()) {
            wishlistRepository.delete(existing.get());
            return "Removed";
        } else {
            WishlistItem item = new WishlistItem();
            item.setUserId(userId);
            item.setProduct(productRepository.findById(productId).orElseThrow());
            wishlistRepository.save(item);
            return "Added";
        }
    }
}
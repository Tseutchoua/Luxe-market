package com.ecommerce.backend.repositories;

import com.ecommerce.backend.models.Product;
import org.springframework.data.domain.Page; // <--- Changed from List
import org.springframework.data.domain.Pageable; // <--- Changed from Sort
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {

    // Search with Pagination
    Page<Product> findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(String name, String description, Pageable pageable);

    // Category Filter with Pagination
    Page<Product> findByCategory(String category, Pageable pageable);
}
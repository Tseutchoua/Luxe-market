package com.ecommerce.backend.controllers;

import com.ecommerce.backend.models.Product;
import com.ecommerce.backend.repositories.ProductRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/products")
@CrossOrigin(origins = "http://localhost:3000") // Allows NextJS to talk to this
public class ProductController {
    private final ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }
       @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }
    @GetMapping
    public Page<Product> getAllProducts(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String category,
            @RequestParam(required = false, defaultValue = "newest") String sort,
            @RequestParam(defaultValue = "0") int page, // Page number (starts at 0)
            @RequestParam(defaultValue = "2") int size // Items per page. Set to 2 so we can test it!
    ) {
        // 1. Determine Sorting Strategy
        Sort sortObj = Sort.by(Sort.Direction.DESC, "id");
        if ("price_asc".equals(sort)) sortObj = Sort.by(Sort.Direction.ASC, "price");
        else if ("price_desc".equals(sort)) sortObj = Sort.by(Sort.Direction.DESC, "price");

        // 2. Create PageRequest (combines Page, Size, and Sort)
        Pageable pageable = PageRequest.of(page, size, sortObj);

        // 3. Fetch Data based on filters
        if (search != null && !search.isEmpty()) {
            return productRepository.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(search, search, pageable);
        }
        if (category != null && !category.isEmpty()) {
            return productRepository.findByCategory(category, pageable);
        }

        // 4. Default: Return all with pagination
        return productRepository.findAll(pageable);
    }
    // GET /api/products/1
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }
    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product productDetails) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setName(productDetails.getName());
        product.setDescription(productDetails.getDescription());
        product.setPrice(productDetails.getPrice());
        product.setCategory(productDetails.getCategory());
        product.setStockQuantity(productDetails.getStockQuantity());
        product.setImageUrl(productDetails.getImageUrl());

        return productRepository.save(product);
    }

    // 4. Delete a product
    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productRepository.deleteById(id);
    }

}

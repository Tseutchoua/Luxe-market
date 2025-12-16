package com.ecommerce.backend.controllers;

import com.ecommerce.backend.repositories.OrderRepository;
import com.ecommerce.backend.repositories.ProductRepository;
import com.ecommerce.backend.repositories.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    public AdminController(ProductRepository productRepository, OrderRepository orderRepository, UserRepository userRepository) {
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/stats")
    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();

        // 1. Total Users
        stats.put("totalUsers", userRepository.count());

        // 2. Total Products
        stats.put("totalProducts", productRepository.count());

        // 3. Total Orders
        stats.put("totalOrders", orderRepository.count());

        // 4. Total Revenue (Handle null if no orders yet)
        BigDecimal revenue = orderRepository.sumTotalRevenue();
        stats.put("totalRevenue", revenue != null ? revenue : BigDecimal.ZERO);

        return stats;
    }
}
package com.ecommerce.backend.controllers;

import com.ecommerce.backend.models.UserOrder;
import com.ecommerce.backend.repositories.OrderRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    private final OrderRepository orderRepository;

    public OrderController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    // 1. Save a new order
    @PostMapping
    public UserOrder createOrder(@RequestBody UserOrder order) {
        return orderRepository.save(order);
    }

    // 2. Get history for a user
    @GetMapping("/user/{email}")
    public List<UserOrder> getUserOrders(@PathVariable String email) {
        return orderRepository.findByUserEmailOrderByOrderDateDesc(email);
    }
}
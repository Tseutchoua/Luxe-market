package com.ecommerce.backend.repositories;

import com.ecommerce.backend.models.UserOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;

public interface OrderRepository extends JpaRepository<UserOrder, Long> {
    // Find all orders belonging to a specific email, sorted by newest first
    List<UserOrder> findByUserEmailOrderByOrderDateDesc(String userEmail);
    // Calculate total revenue (Sum of totalAmount)
    @Query("SELECT SUM(o.totalAmount) FROM UserOrder o")
    BigDecimal sumTotalRevenue();
}
package com.ecommerce.backend.controllers;

import com.ecommerce.backend.models.Coupon;
import com.ecommerce.backend.repositories.CouponRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/coupons")
@CrossOrigin(origins = "http://localhost:3000")
public class CouponController {

    private final CouponRepository couponRepository;

    public CouponController(CouponRepository couponRepository) {
        this.couponRepository = couponRepository;
    }

    // Validate a code
    @PostMapping("/validate")
    public Coupon validateCoupon(@RequestBody Map<String, String> payload) {
        String code = payload.get("code");
        return couponRepository.findByCode(code)
                .filter(Coupon::isActive)
                .orElseThrow(() -> new RuntimeException("Invalid or inactive coupon"));
    }
}
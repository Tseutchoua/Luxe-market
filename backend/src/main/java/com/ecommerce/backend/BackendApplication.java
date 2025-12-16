package com.ecommerce.backend;

import com.ecommerce.backend.models.Product;
import com.ecommerce.backend.models.Coupon;
import com.ecommerce.backend.repositories.CouponRepository;
import com.ecommerce.backend.repositories.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.math.BigDecimal;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}
    // This runs automatically when the server starts
    @Bean
    CommandLineRunner initDatabase(ProductRepository productRepository, CouponRepository couponRepository) {
        return args -> {
            if (productRepository.count() == 0) {
                Product p1 = new Product();
                p1.setName("Cool T-Shirt");
                p1.setDescription("A premium cotton t-shirt.");
                p1.setPrice(new BigDecimal("12000"));
                p1.setCategory("Clothing");
                p1.setStockQuantity(100); // <--- Plenty in stock
                p1.setImageUrl("https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80");
                productRepository.save(p1);

                Product p2 = new Product();
                p2.setName("Fancy Sneakers");
                p2.setDescription("High-performance running shoes.");
                p2.setPrice(new BigDecimal("45000"));
                p2.setCategory("Footwear");
                p2.setStockQuantity(3); // <--- Low stock (Urgency!)
                p2.setImageUrl("https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80");
                productRepository.save(p2);

                Product p3 = new Product();
                p3.setName("Luxury Watch");
                p3.setDescription("Elegant wrist watch.");
                p3.setPrice(new BigDecimal("85000"));
                p3.setCategory("Accessories");
                p3.setStockQuantity(0); // <--- OUT OF STOCK
                p3.setImageUrl("https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80");
                productRepository.save(p3);

                if (couponRepository.count() == 0) {
                    Coupon c1 = new Coupon();
                    c1.setCode("SAVE20");
                    c1.setDiscountPercentage(20);
                    c1.setActive(true);
                    couponRepository.save(c1);

                    Coupon c2 = new Coupon();
                    c2.setCode("WELCOME50");
                    c2.setDiscountPercentage(50);
                    c2.setActive(true);
                    couponRepository.save(c2);

                    System.out.println("Coupons inserted!");
                }

                System.out.println("Data with Stock inserted!");
            }
        };
    }
}

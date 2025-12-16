package com.ecommerce.backend.controllers;

import com.stripe.Stripe;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {

    @Value("${stripe.secret.key}")
    private String stripeSecretKey;

    @PostMapping("/create-checkout-session")
    public String createCheckoutSession(@RequestBody List<Map<String, Object>> cartItems) {
        Stripe.apiKey = stripeSecretKey;

        // 1. Create a list to hold the finished LineItems
        List<SessionCreateParams.LineItem> lineItems = new ArrayList<>();

        for (Map<String, Object> item : cartItems) {

            // Create Product Data
            SessionCreateParams.LineItem.PriceData.ProductData productData =
                    SessionCreateParams.LineItem.PriceData.ProductData.builder()
                            .setName(item.get("name").toString())
                            .build();

            // Create Price Data
            SessionCreateParams.LineItem.PriceData priceData =
                    SessionCreateParams.LineItem.PriceData.builder()
                            .setCurrency("xaf")
                            .setUnitAmount(Long.parseLong(item.get("price").toString()))
                            .setProductData(productData)
                            .build();

            // Create the LineItem and ADD .build() at the end!
            SessionCreateParams.LineItem lineItem = SessionCreateParams.LineItem.builder()
                    .setQuantity(Long.parseLong(item.get("quantity").toString()))
                    .setPriceData(priceData)
                    .build(); // <--- This fixes the error

            lineItems.add(lineItem);
        }

        // 2. Build the Session
        SessionCreateParams params = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://localhost:3000/success")
                .setCancelUrl("http://localhost:3000/cart")
                .addAllLineItem(lineItems) // Now this list is the correct type
                .build();

        try {
            Session session = Session.create(params);
            return session.getUrl();
        } catch (Exception e) {
            e.printStackTrace();
            return "Error: " + e.getMessage();
        }
    }
}
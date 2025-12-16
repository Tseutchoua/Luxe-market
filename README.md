# 🛍️ LuxeMarket - Premium Full Stack E-Commerce Platform

A robust, professional E-commerce application built from scratch using **Java Spring Boot** and **Next.js**. This project features a complete shopping experience, secure payments via Stripe, an admin dashboard, and user authentication.

---

## 🚀 Tech Stack

### **Backend**
*   **Language:** Java 21
*   **Framework:** Spring Boot 3.4
*   **Database:** PostgreSQL
*   **Security:** Spring Security (JWT-style logic), BCrypt Password Encoder
*   **ORM:** Spring Data JPA & Hibernate
*   **Payments:** Stripe API Integration
*   **File Storage:** Local File System (Images)

### **Frontend**
*   **Framework:** Next.js 15 (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **State Management:** React Context API
*   **UI Libraries:** Framer Motion (Animations), React Hot Toast (Notifications)

---

## ✨ Key Features

### **🛒 Customer Experience**
*   **Product Discovery:** Advanced Search, Category Filtering, Sorting (Price/Date), and Pagination.
*   **Product Details:** Rich product pages with zoom effects and related product recommendations.
*   **Shopping Cart:** Global cart management with real-time totals.
*   **Checkout:** Secure credit card processing via **Stripe**.
*   **Wishlist:** Save items for later (Heart icon logic).
*   **Discounts:** Apply coupon codes (e.g., `SAVE20`) to update totals instantly.
*   **Reviews:** Star ratings and comments system.

### **👤 User Accounts**
*   **Authentication:** Secure Register and Login.
*   **Profile:** User dashboard showing personal details.
*   **Order History:** View past orders with status and total amounts.

### **⚡ Admin Dashboard**
*   **Analytics:** Real-time overview of Revenue, Total Orders, Users, and Inventory count.
*   **Inventory Management:** Add, Edit, and Delete products.
*   **Image Upload:** Drag-and-drop image uploading (saved locally).
*   **Stock Control:** Set stock levels; products auto-update to "Out of Stock" or "Low Stock".

---

## 🛠️ Setup & Installation

### **Prerequisites**
*   Java JDK 21
*   Node.js (LTS)
*   PostgreSQL
*   Stripe Account (for API Keys)

### **1. Database Setup**
Open PostgreSQL (pgAdmin or SQL Shell) and create the database:
```sql
CREATE DATABASE ecommercedb;

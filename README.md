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
2. Backend Setup

Navigate to the backend folder.

Open src/main/resources/application.properties.

Configure your database credentials and Stripe Key:

code
Properties
download
content_copy
expand_less
spring.datasource.url=jdbc:postgresql://localhost:5432/ecommercedb
spring.datasource.username=postgres
spring.datasource.password=YOUR_DB_PASSWORD

# Stripe Settings
stripe.secret.key=sk_test_YOUR_STRIPE_KEY

Run the application using IntelliJ IDEA or Maven:

code
Bash
download
content_copy
expand_less
./mvnw spring-boot:run

The server will start on port 8081.

3. Frontend Setup

Navigate to the frontend folder.

Install dependencies:

code
Bash
download
content_copy
expand_less
npm install

Run the development server:

code
Bash
download
content_copy
expand_less
npm run dev

The application will be available at http://localhost:3000.

📸 Screenshots

(You can upload screenshots of your Home Page, Cart, and Admin Dashboard here later)

🛡️ Security Note

This project was built for educational purposes.

API Keys: Never commit real API keys to GitHub.

Production: For a live deployment, configure environment variables and cloud storage (AWS S3) for images.

Author: FOPS



# 🎯 MIRO MARKET - Role-Based Online Shopping System

## Complete System Architecture & Implementation Guide

---

## 📋 TABLE OF CONTENTS

1. System Architecture Overview
2. Database Design
3. Backend Structure
4. API Endpoints Reference
5. Role-Based Access Control
6. Frontend Integration Guide
7. Deployment Checklist

---

## 1️⃣ SYSTEM ARCHITECTURE OVERVIEW

### 🏗️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND (React)                         │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐            │
│  │   Home Page  │ │ Product Page │ │ Dashboard    │            │
│  └──────────────┘ └──────────────┘ └──────────────┘            │
│         │                │                │                      │
│         └────────────────┼────────────────┘                      │
│                          │                                       │
│              (Axios API Calls + JWT Token)                      │
└──────────────────────────┼──────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    API GATEWAY (PHP)                             │
│  ┌────────────────────────────────────────────────────┐         │
│  │ Router (index.php) - Routes incoming requests     │         │
│  └────────────────────────────────────────────────────┘         │
└─────────────────────────────────────────────────────────────────┘
         │
    ┌────┴──────┬──────────┬──────────┐
    ▼           ▼          ▼          ▼
┌─────────┐ ┌─────────┐ ┌─────────┐ ┌──────────────┐
│Middleware│ │Controller│ │Service │ │ Middleware  │
│Auth      │ │Auth     │ │Auth    │ │Role Check   │
│Validation│ │Product  │ │Product │ │Token Check  │
└─────────┘ └─────────┘ └─────────┘ └──────────────┘
    │           │          │
    └───────────┼──────────┘
                ▼
        ┌──────────────────┐
        │  Models (CRUD)   │
        │  User, Product   │
        │  Order, Payment  │
        └──────────────────┘
                │
                ▼
        ┌──────────────────┐
        │   MySQL Database │
        │  Tables, Records │
        └──────────────────┘
```

### 🔄 Request Flow Example

**User Logs In:**

1. React Frontend → POST /api/auth/login (email, password)
2. AuthController receives request
3. Validates input using Validator
4. AuthService checks database for user
5. If valid → generates JWT token
6. Returns token to React
7. React stores in localStorage
8. React uses token for all future requests

**Customer Browses Products:**

1. React Frontend → GET /api/products
2. Router routes to ProductController
3. ProductController uses ProductService
4. ProductService queries Product model
5. Model returns data from Database
6. Response formatted as JSON
7. React receives and displays

**Admin Creates Product (Restricted):**

1. React Frontend → POST /api/products (with JWT token)
2. Router routes to ProductController
3. AuthMiddleware checks JWT token
4. RoleMiddleware checks if role = 'admin'
5. If authorized → ProductController proceeds
6. If unauthorized → Returns error 403 Forbidden
7. ProductService creates in database
8. Returns success response

---

## 2️⃣ DATABASE DESIGN (MySQL)

### 📊 Entity Relationship Diagram

```
USERS (1) ──────────────────── (M) PRODUCTS
  │                                   │
  │                                   │
  (1)                               (M)
  │                                   │
  └──► (M) ORDERS ◄────── (M) PRODUCT_VARIANTS
       │      │
       │      (M)
       │      │
       └──► ORDER_ITEMS
       │
       (M)
       │
       └──► PAYMENTS
```

### 📋 Database Tables

#### 1. **USERS Table**

```sql
users:
  id (PK)
  name
  email (UNIQUE)
  password (hashed)
  phone
  address
  role (customer, staff, admin)
  status (active, inactive)
  created_at
  updated_at
```

#### 2. **CATEGORIES Table**

```sql
categories:
  id (PK)
  name
  slug (UNIQUE)
  image_url
  created_at
```

#### 3. **PRODUCTS Table**

```sql
products:
  id (PK)
  name
  slug (UNIQUE)
  description
  price
  discount_price
  stock
  category_id (FK → categories)
  image_url
  created_at
  updated_at
```

#### 4. **PRODUCT_VARIANTS Table**

```sql
product_variants:
  id (PK)
  product_id (FK → products)
  color
  size
  image_url
  stock
  created_at
```

#### 5. **CARTS Table**

```sql
carts:
  id (PK)
  user_id (FK → users)
  product_id (FK → products)
  variant_id (FK → product_variants)
  quantity
  created_at
```

#### 6. **ORDERS Table**

```sql
orders:
  id (PK)
  user_id (FK → users)
  order_number (UNIQUE)
  total
  subtotal
  shipping_cost
  tax
  status (pending, processing, shipped, delivered)
  payment_status (pending, completed, failed)
  shipping_address
  created_at
```

#### 7. **ORDER_ITEMS Table**

```sql
order_items:
  id (PK)
  order_id (FK → orders)
  product_id (FK → products)
  variant_id (FK → product_variants)
  quantity
  price
  created_at
```

#### 8. **PAYMENTS Table**

```sql
payments:
  id (PK)
  order_id (FK → orders)
  user_id (FK → users)
  amount
  method
  status (pending, completed, failed)
  reference
  created_at
```

#### 9. **WISHLIST Table**

```sql
wishlist:
  id (PK)
  user_id (FK → users)
  product_id (FK → products)
  created_at
```

---

## 3️⃣ PHP BACKEND STRUCTURE

### 📁 Folder Organization

```
backend/
├── index.php                    ← Main entry point (router)
├── .htaccess                    ← URL rewriting rules
├── config/
│   ├── Database.php             ← DB connection (singleton)
│   └── Constants.php            ← App constants
├── routes/
│   └── api.php                  ← All API routes
├── controllers/
│   ├── AuthController.php       ← Login, Signup, Logout
│   ├── ProductController.php    ← Products CRUD
│   ├── CartController.php       ← Cart operations
│   ├── OrderController.php      ← Orders management
│   ├── PaymentController.php    ← Payment handling
│   ├── UserController.php       ← User management
│   ├── CategoryController.php   ← Categories CRUD
│   ├── WishlistController.php   ← Wishlist operations
│   ├── ReturnController.php     ← Returns management
│   └── AdminController.php      ← Admin operations
├── models/
│   ├── User.php                 ← User DB operations
│   ├── Product.php              ← Product DB operations
│   ├── Order.php                ← Order DB operations
│   ├── Cart.php                 ← Cart DB operations
│   ├── Payment.php              ← Payment DB operations
│   ├── Category.php             ← Category DB operations
│   ├── Wishlist.php             ← Wishlist DB operations
│   └── ActivityLog.php          ← Activity logging
├── services/
│   ├── AuthService.php          ← Business logic for auth
│   ├── ProductService.php       ← Business logic for products
│   ├── OrderService.php         ← Business logic for orders
│   └── UserService.php          ← Business logic for users
├── middlewares/
│   ├── AuthMiddleware.php       ← JWT token validation
│   ├── RoleMiddleware.php       ← Role-based access check
│   └── ValidationMiddleware.php ← Input validation
├── database/
│   └── schema.sql               ← Database structure
└── utils/
    ├── Response.php             ← JSON response helper
    ├── TokenHandler.php         ← JWT generation/validation
    └── Validator.php            ← Input validation rules
```

### 🎯 Key Principles

1. **Single Responsibility**: Each class has one job
2. **DRY (Don't Repeat Yourself)**: Reusable utilities
3. **Security**: Validation, prepared statements, JWT
4. **Scalability**: Services handle business logic
5. **Clean Code**: Clear naming and structure

---

## 4️⃣ COMPLETE API ENDPOINTS REFERENCE

### 🔐 AUTHENTICATION ENDPOINTS

| Method | Endpoint            | Description              | Auth Required | Role   |
| ------ | ------------------- | ------------------------ | ------------- | ------ |
| POST   | `/api/auth/signup`  | Register new customer    | ❌            | Public |
| POST   | `/api/auth/login`   | Login user               | ❌            | Public |
| POST   | `/api/auth/logout`  | Logout user              | ✅            | Any    |
| GET    | `/api/auth/profile` | Get current user profile | ✅            | Any    |
| POST   | `/api/auth/refresh` | Refresh JWT token        | ✅            | Any    |

### 📦 PRODUCT ENDPOINTS

| Method | Endpoint            | Description                   | Auth Required | Role        |
| ------ | ------------------- | ----------------------------- | ------------- | ----------- |
| GET    | `/api/products`     | List all products (paginated) | ❌            | Public      |
| GET    | `/api/products/:id` | Get product details           | ❌            | Public      |
| POST   | `/api/products`     | Create product                | ✅            | Admin/Staff |
| PUT    | `/api/products/:id` | Update product                | ✅            | Admin/Staff |
| DELETE | `/api/products/:id` | Delete product                | ✅            | Admin       |
| GET    | `/api/categories`   | Get all categories            | ❌            | Public      |
| POST   | `/api/categories`   | Create category               | ✅            | Admin       |

### 🛒 CART ENDPOINTS

| Method | Endpoint        | Description               | Auth Required | Role     |
| ------ | --------------- | ------------------------- | ------------- | -------- |
| GET    | `/api/cart`     | Get user's cart           | ✅            | Customer |
| POST   | `/api/cart/add` | Add item to cart          | ✅            | Customer |
| PUT    | `/api/cart/:id` | Update cart item quantity | ✅            | Customer |
| DELETE | `/api/cart/:id` | Remove item from cart     | ✅            | Customer |
| DELETE | `/api/cart`     | Clear cart                | ✅            | Customer |

### 📋 ORDER ENDPOINTS

| Method | Endpoint                | Description            | Auth Required | Role                 |
| ------ | ----------------------- | ---------------------- | ------------- | -------------------- |
| GET    | `/api/orders`           | Get user's orders      | ✅            | Customer             |
| GET    | `/api/orders/admin/all` | Get all orders         | ✅            | Admin/Staff          |
| GET    | `/api/orders/:id`       | Get order details      | ✅            | Customer/Admin/Staff |
| POST   | `/api/orders`           | Create order from cart | ✅            | Customer             |
| PUT    | `/api/orders/:id`       | Update order status    | ✅            | Admin/Staff          |
| GET    | `/api/orders/track/:id` | Track order            | ❌            | Public               |

### 💳 PAYMENT ENDPOINTS

| Method | Endpoint                      | Description         | Auth Required | Role        |
| ------ | ----------------------------- | ------------------- | ------------- | ----------- |
| POST   | `/api/payments/verify`        | Verify payment      | ✅            | Customer    |
| GET    | `/api/payments/order/:id`     | Get payment status  | ✅            | Any         |
| POST   | `/api/payments/manual-verify` | Manual verification | ✅            | Staff/Admin |

### 👥 USER ENDPOINTS

| Method | Endpoint              | Description      | Auth Required | Role        |
| ------ | --------------------- | ---------------- | ------------- | ----------- |
| GET    | `/api/users`          | Get all users    | ✅            | Admin       |
| GET    | `/api/users/:id`      | Get user details | ✅            | Admin/Owner |
| PUT    | `/api/users/:id`      | Update user      | ✅            | Admin/Owner |
| DELETE | `/api/users/:id`      | Delete user      | ✅            | Admin       |
| PUT    | `/api/users/:id/role` | Change user role | ✅            | Admin       |

### 💝 WISHLIST ENDPOINTS

| Method | Endpoint            | Description          | Auth Required | Role     |
| ------ | ------------------- | -------------------- | ------------- | -------- |
| GET    | `/api/wishlist`     | Get user's wishlist  | ✅            | Customer |
| POST   | `/api/wishlist/add` | Add to wishlist      | ✅            | Customer |
| DELETE | `/api/wishlist/:id` | Remove from wishlist | ✅            | Customer |

### 📊 ADMIN ENDPOINTS

| Method | Endpoint                     | Description          | Auth Required | Role        |
| ------ | ---------------------------- | -------------------- | ------------- | ----------- |
| GET    | `/api/admin/dashboard/stats` | Dashboard statistics | ✅            | Admin/Staff |
| GET    | `/api/admin/inventory`       | Inventory status     | ✅            | Admin/Staff |
| GET    | `/api/admin/sales-report`    | Sales report         | ✅            | Admin       |
| POST   | `/api/admin/staff`           | Add staff member     | ✅            | Admin       |
| GET    | `/api/admin/staff`           | List staff members   | ✅            | Admin       |

---

## 5️⃣ ROLE-BASED ACCESS CONTROL (RBAC)

### 🔑 Permission Matrix

```
┌─────────────────────────┬──────────┬───────┬──────────┐
│ Feature                 │ Customer │ Staff │ Admin    │
├─────────────────────────┼──────────┼───────┼──────────┤
│ Browse Products         │ ✅ View  │ ✅    │ ✅       │
│ Create Products         │ ❌       │ ✅    │ ✅       │
│ Edit Products           │ ❌       │ ✅    │ ✅       │
│ Delete Products         │ ❌       │ ❌    │ ✅       │
│ Manage Orders           │ Own Only │ All   │ All      │
│ Change Order Status     │ ❌       │ ✅    │ ✅       │
│ Process Payments        │ Own Only │ ✅    │ ✅       │
│ Manage Users            │ ❌       │ ❌    │ ✅       │
│ View Reports            │ ❌       │ ✅    │ ✅       │
│ Manage Staff            │ ❌       │ ❌    │ ✅ Only  │
│ System Settings         │ ❌       │ ❌    │ ✅ Only  │
└─────────────────────────┴──────────┴───────┴──────────┘
```

### 🛡️ Implementation Strategy

**Middleware Stack:**

```
Request
   ↓
[1] AuthMiddleware (Verify JWT Token)
   ↓ (If failed → 401 Unauthorized)
[2] RoleMiddleware (Check User Role)
   ↓ (If failed → 403 Forbidden)
[3] Controller (Execute Business Logic)
   ↓
Response
```

---

## 6️⃣ FRONTEND INTEGRATION GUIDE

### 📡 Using Axios with React

```javascript
// Setup in frontend/src/services/api.js
import axios from "axios";

const API_URL = "http://localhost/Online%20Shopping%20System/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to add JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

### 🔄 Redux + API Integration

```javascript
// Redux Thunk Example
export const loginUser = (email, password) => async (dispatch) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    const { token, user } = response.data.data;

    localStorage.setItem("token", token);
    dispatch(setUser(user));
    dispatch(setToken(token));
  } catch (error) {
    dispatch(setError(error.response.data.error));
  }
};
```

---

## 7️⃣ COLOR BRANDING

### 🎨 Your Brand Colors

```
Primary Orange:    #F97316
Secondary Blue:    #0B1C3F
Accent White:      #FFFFFF
Neutral Gray:      #F3F4F6
Success Green:     #10B981
Error Red:         #EF4444
Warning Amber:     #F59E0B
```

### 🎨 Usage in Components

```jsx
// Buttons
<button className="bg-orange-500 hover:bg-orange-600 text-white">
  Order Now
</button>

// Headers/Navigation
<header className="bg-blue-900 text-white">
  Miro Market
</header>

// Success Messages
<div className="bg-green-100 text-green-800 p-4">
  Order placed successfully!
</div>
```

---

## ✅ NEXT STEPS

1. ✅ Import database schema into MySQL
2. ✅ Create all PHP files following structure
3. ✅ Test API endpoints with Postman
4. ✅ Create frontend service layer
5. ✅ Connect React components to API
6. ✅ Test complete flow (signup → browse → order)
7. ✅ Deploy to production

---

**Created by:** Senior Full-Stack Engineer
**For:** Miro Market - Role-Based Online Shopping System
**Date:** 2026-05-06

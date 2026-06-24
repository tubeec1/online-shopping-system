# 🛒 Role-Based Online Shopping System

A full-stack E-Commerce Web Application developed as a Final Year Project for the Bachelor of Information Technology program.

The system allows customers to browse products, place orders, and submit payment proofs, while administrators and staff manage categories, products, orders, users, and reports through a secure role-based dashboard.

---

# 📌 Project Information

**Project Title:**
Design and Implementation of a Role-Based Online Shopping System for Miro Market

**Developer:**
Mohamed Suleyman Ibrahim

**Location:**
Mogadishu, Somalia

**Project Type:**
Academic Final Year Project

---

# 🛠 Technologies Used

## Frontend

- React.js
- React Router DOM
- Redux Toolkit
- Axios
- Tailwind CSS
- Recharts
- React Icons
- React Hot Toast

## Backend

- PHP MVC Architecture
- RESTful API
- JWT Authentication
- Role-Based Access Control (RBAC)

## Database

- MySQL

## Development Tools

- Visual Studio Code
- XAMPP
- Git & GitHub
- Postman

---

# 👥 System Roles

## Administrator (Role ID = 1)

The Administrator has full access to the system and can:

- Manage Users
- Manage Categories
- Manage Products
- Manage Orders
- Verify Payments
- View Reports
- Manage Roles & Permissions
- View Dashboard Analytics

---

## Staff (Role ID = 2)

The Staff can:

- Manage Categories
- Manage Products
- Manage Orders
- Verify Payments
- View Dashboard

**Note:**
Staff members cannot access Reports.

---

## Customer (Role ID = 3)

Customers can:

- Register Account
- Login
- Browse Products
- Search Products
- Add Products to Cart
- Place Orders
- Upload Payment Proof
- Track Orders
- View Order History
- Manage Profile

---

# ⚙️ Main Features

## Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Role-Based Access Control

## Categories

- Create Category
- Update Category
- Delete Category
- View Categories

## Products

- Create Product
- Update Product
- Delete Product
- Product Images
- Product Stock Management

## Shopping Cart

- Add to Cart
- Remove from Cart
- Update Quantity

## Orders

- Create Orders
- View Orders
- Update Order Status

Order Statuses:

- Pending
- Paid
- Processing
- Shipped
- Delivered
- Cancelled

## Payment Management

Manual Payment Verification

Customers upload:

- Receipt Screenshot
- Transaction Information

Admin/Staff can:

- Approve Payment
- Reject Payment

## Reports Dashboard

Admin Only

Reports include:

- Total Users
- Total Categories
- Total Products
- Total Orders
- Total Revenue
- Orders by Status
- Revenue Analytics
- Recent Orders

---

# 🧱 System Architecture

The project follows a layered architecture.

```text
Frontend (React + Redux)
        ↓
REST API (PHP MVC)
        ↓
MySQL Database
```

### Backend Structure

```text
backend/
│
├── app/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   ├── services/
│   └── helpers/
│
├── routes/
├── config/
├── public/
└── storage/
```

### Frontend Structure

```text
frontend/
│
├── src/
│   ├── pages/
│   ├── components/
│   ├── layouts/
│   ├── features/
│   ├── redux/
│   ├── routes/
│   └── api/
```

---

# 🗄 Database Tables

Main tables used in the system:

- users
- roles
- permissions
- role_permissions
- categories
- products
- carts
- cart_items
- orders
- order_items
- payments

---

# 🚀 Installation Guide

## Step 1: Clone Repository

```bash
git clone https://github.com/tubeec1/online-shopping-system.git
```

---

## Step 2: Move Project

Copy project folder into:

```text
xampp/htdocs/
```

Example:

```text
xampp/htdocs/online-shopping-system
```

---

## Step 3: Create Database

Open phpMyAdmin

Create database:

```sql
oss
```

Import:

```text
database.sql
```

---

## Step 4: Configure Backend

Update database connection settings inside:

```text
backend/config/database.php
```

Example:

```php
$host = "localhost";
$user = "root";
$password = "";
$database = "oss";
```

---

## Step 5: Install Frontend Packages

Open terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

or

```bash
npm install axios react-redux @reduxjs/toolkit react-router-dom react-icons react-hot-toast recharts
```

---

## Step 6: Run Frontend

```bash
npm run dev
```

Default:

```text
http://localhost:5173
```

---

## Step 7: Run Backend

Start:

- Apache
- MySQL

from XAMPP Control Panel

Backend URL:

```text
http://localhost/online-shopping-system/backend
```

API URL:

```text
http://localhost/online-shopping-system/backend/api
```

---

# 📸 System Screenshots

All screenshots are located inside:

```text
screenshots/
```

## Authentication

### Sign In

![Sign In](screenshots/signin.png)

### Sign Up

![Sign Up](screenshots/signup.png)

---

## Dashboard

### Admin Dashboard

![Dashboard](screenshots/dashboard.png)

---

## Category Management

### Category Form

![Category Form](screenshots/categoryForm.png)

---

## Product Management

### Product Form

![Product Form](screenshots/productForm.png)

---

## Order Management

### Orders Page

![Orders](screenshots/orderForm.png)

---

## Reports

### Reports Dashboard

![Reports 1](screenshots/Reports1.png)

### Reports Analytics

![Reports 2](screenshots/Reports2.png)

---

# 🔒 Security Features

- JWT Authentication
- Password Hashing
- Protected Routes
- Middleware Authorization
- Role-Based Access Control
- API Validation
- Input Sanitization

---

# 🎓 Academic Purpose

This project was developed as a Final Year Project requirement for obtaining a Bachelor's Degree in Information Technology.

---

# 👨‍💻 Author

### Mohamed Suleyman Ibrahim

Full Stack Developer

Mogadishu, Somalia

GitHub:
https://github.com/tubeec1

---

# 📄 License

This project is provided for educational and academic purposes.

Students may use, learn from, and extend the project for research and educational activities.

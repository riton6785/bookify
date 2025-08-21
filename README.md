# 📚 Bookify – Full-Stack Book E-Commerce Platform

Bookify is a modern **full-stack e-commerce application** for selling books online. It offers a seamless experience for both **users** and **admins**, with real-time features, secure payments, and dynamic dashboards.

---

## 🌟 Features

### User Features
- **Authentication:** Secure login and registration.
- **Book Catalog:** Browse, search, and filter books.
- **Cart & Wishlist:** Add books to cart or wishlist.
- **Purchase Books:** Buy books with Razorpay integration (test mode).
- **Invoice Generation:** PDF invoices generated using Puppeteer and stored in Cloudinary; sent automatically via **Nodemailer**.
- **Reviews:** Add and view real-time reviews for books.

### Admin Features
- **Book Management:** Create, edit, and manage book products.
- **Interactive Dashboard:** Real-time sales and product performance visualization using graphs.
- **User & Order Management:** View all users, their purchases, and manage products/orders.

---

## 🛠 Tech Stack

### Frontend
- React.js + **Chakra UI** for UI components
- Redux Toolkit for state management
- React Router for navigation
- Axios for API requests

### Backend
- Node.js + Express.js
- MongoDB (Mongoose ORM)
- JWT for authentication
- **Nodemailer** for emails
- Razorpay for payments (test mode)
- Puppeteer + Cloudinary for PDF invoice generation

---

## 🛠 Environment Variables

### Backend Environment Variables

These variables configure your backend for database connection, authentication, payments, emails, and cloud storage.

| Variable | Description |
|----------|-------------|
| `MONGOURI` | MongoDB connection string to connect your backend to the database. |
| `JWT_SECRET` | Secret key used to sign JWT tokens for authentication. Keep it secure. |
| `RAZORPAY_API_KEY_ID` | Razorpay public key for payment processing (test or live mode). |
| `RAZORPAY_API_KEY_SECRET` | Razorpay secret key for signing payments. |
| `PUBLISHABLE_KEY` | Razorpay publishable key for frontend usage. |
| `RESTRICTED_KEY` | Restricted key for specific payment operations. |
| `MAIL_HOST` | SMTP server host for sending emails (e.g., smtp.gmail.com). |
| `MAIL_USER` | Email address used for sending emails via Nodemailer. |
| `MAIL_PASS` | App-specific password or email password for sending emails. |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary account cloud name for storing PDFs/images. |
| `CLOUDINARY_API_KEY` | API key to authenticate Cloudinary API requests. |
| `CLOUDINARY_API_SECRET` | API secret for Cloudinary API authentication. |

### Frontend Environment Variables

These variables configure the frontend to connect to the backend API.

| Variable | Description |
|----------|-------------|
| `VITE_BACKEND_URL` | Base URL of the backend API. Used for API calls from the frontend. Must start with `VITE_` to be accessible in the browser. |


**⚙️ Installation & Setup**
# 📚 Bookify – Full-Stack Book E-Commerce Platform

Bookify is a modern **full-stack e-commerce application** for selling books online. It provides a seamless experience for both **users** and **admins**, with real-time features, secure payments, PDF invoices, and interactive dashboards.

---

## 🌟 Features

### User Features
- **Authentication:** Secure login and registration.
- **Book Catalog:** Browse, search, and filter books.
- **Cart & Wishlist:** Add books to cart or wishlist.
- **Purchase Books:** Buy books with Razorpay integration (test mode).
- **Invoice Generation:** PDF invoices generated using Puppeteer and stored on Cloudinary; sent automatically via **Nodemailer**.
- **Reviews:** Add and view real-time reviews for books.

### Admin Features
- **Book Management:** Create, edit, and manage book products.
- **Interactive Dashboard:** Real-time sales and product performance visualization using graphs.
- **User & Order Management:** View all users, their purchases, and manage products/orders.

---

## 🛠 Tech Stack

### Frontend
- React.js + **Chakra UI** for UI components
- Redux Toolkit for state management
- React Router for navigation
- Axios for API requests

### Backend
- Node.js + Express.js
- MongoDB (Mongoose ORM)
- JWT for authentication
- **Nodemailer** for emails
- Razorpay for payments (test mode)
- Puppeteer + Cloudinary for PDF invoice generation

---

## 🛠 Environment Variables

### Backend Environment Variables

These variables configure your backend for database connection, authentication, payments, emails, and cloud storage.

| Variable | Description |
|----------|-------------|
| `MONGOURI` | MongoDB connection string to connect your backend to the database. |
| `JWT_SECRET` | Secret key used to sign JWT tokens for authentication. Keep it secure. |
| `RAZORPAY_API_KEY_ID` | Razorpay public key for payment processing (test or live mode). |
| `RAZORPAY_API_KEY_SECRET` | Razorpay secret key for signing payments. |
| `PUBLISHABLE_KEY` | Razorpay publishable key for frontend usage. |
| `RESTRICTED_KEY` | Restricted key for specific payment operations. |
| `MAIL_HOST` | SMTP server host for sending emails (e.g., smtp.gmail.com). |
| `MAIL_USER` | Email address used for sending emails via Nodemailer. |
| `MAIL_PASS` | App-specific password or email password for sending emails. |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary account cloud name for storing PDFs/images. |
| `CLOUDINARY_API_KEY` | API key to authenticate Cloudinary API requests. |
| `CLOUDINARY_API_SECRET` | API secret for Cloudinary API authentication. |

### Frontend Environment Variables

These variables configure the frontend to connect to the backend API.

| Variable | Description |
|----------|-------------|
| `VITE_BACKEND_URL` | Base URL of the backend API. Used for API calls from the frontend. Must start with `VITE_` to be accessible in the browser. |

> ⚠ **Security Note:** Never commit `.env` files with credentials to public repositories.

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/riton6785/bookify.git
cd bookify
```
### 2 Backend Setup
```cd backend
npm install
```
- Create a .env file with the backend environment variables.
- Start the server:
```
nodemon server.js
```

### 3 Frontend setup
```
cd ../frontend
npm install
```
- Create a .env file with the frontend environment variable.
- Start the frontend:

```
npm run dev
```

**💳 Payment System**
- Razorpay integrated for secure payments.
- Users can purchase books, with transactions tracked in the admin dashboard.

**📄 Invoice System**
- PDF invoices generated using Puppeteer.
- Stored on Cloudinary for easy access.
- Automatically emailed to users via Nodemailer after purchase.

**📊 Admin Dashboard**
- Real-time visualization of sales and products.
- Graphs for product performance and revenue tracking.
- Full access to all users, orders, and product data

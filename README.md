# 🛒 E-Commerce Learning Project

A full-featured e-commerce web application built with **Node.js**, **Express**, and **MongoDB**. This project allows users to browse products, manage their shopping carts, and complete purchases with Stripe payment integration. It includes user authentication, an admin panel for managing products and orders, and supports features like file uploads and email notifications.

---

## 📦 Features

- **User Authentication**

  - Secure registration and login system using hashed passwords.
  - Session management with persistent login states.

- **Product Management**

  - Admins can add, edit, and delete products.
  - Support for uploading product images.

- **Shopping Cart**

  - Users can add products to their cart.
  - Adjust quantities or remove items.
  - Cart persists across sessions.

- **Order Processing**

  - Users can place orders and receive confirmation.
  - Admins can view and manage all orders.

- **Stripe Payment Integration**

  - Secure and seamless payment processing using Stripe.

- **Email Notifications**

  - Send order confirmations and other notifications via email.

- **Admin Panel**

  - Dedicated interface for admins to manage products, orders, and users.

- **MVC Architecture**

  - Structured codebase following the Model-View-Controller pattern for scalability and maintainability.

---

## 🛠️ Tech Stack

| Layer            | Technology                     |
| ---------------- | ------------------------------ |
| Backend          | Node.js, Express.js            |
| Frontend (views) | EJS Templates                  |
| Database         | MongoDB (via Mongoose)         |
| Session Store    | connect-mongodb-session        |
| File Handling    | multer, fs                     |
| Security         | bcryptjs, csrf                 |
| Utilities        | dotenv, express-validator      |
| Mail Services    | nodemailer, sendgrid transport |
| PDF Generator    | pdfkit                         |

---

## 📁 Project Structure

```
.
├── controllers/        # Route handlers
├── data/
│   └── invoices/       # Generated PDF invoices
├── images/
│   └── productImages/  # Uploaded product images
├── middlewares/        # Custom middleware functions
├── models/             # Mongoose schemas and models
├── public/
│   └── css/            # Static CSS files
├── routers/            # Express route definitions
├── util/               # Utility functions (e.g., PDF generation)
├── views/
│   ├── admin/          # Admin panel views
│   ├── auth/           # Authentication views
│   ├── includes/       # Reusable EJS components
│   └── shop/           # Shop-related views
├── .gitignore
├── index.js            # Entry point of the application
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running
- Stripe account for payment integration([github.com][2])

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/AhmedRedaG/E-Commerce-Learning.git
   cd E-Commerce-Learning
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   SESSION_SECRET=your_session_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   ```

4. **Start the application:**

   ```bash
   npm start
   ```

The application will be running at `http://localhost:3000`.

---

## 👨‍💻 Admin Panel

Accessible at: `/admin/products`

Features:

- Add/Edit/Delete Products
- View All Products

---

## 🧪 Validation & Security

- Input validation via `express-validator`
- Passwords hashed using `bcryptjs`
- CSRF protection implemented via `csurf`
- Sessions stored securely in MongoDB

---

## 🧾 PDF Invoice & Emails

- Invoice PDFs generated using `pdfkit`
- Order confirmation emails sent via **SendGrid + Nodemailer**

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 📬 Contact

For any inquiries or feedback, please contact [Ahmed Reda](mailto:ahmedrf.dev@gmail.com).

---

_Happy Coding!_ 🚀

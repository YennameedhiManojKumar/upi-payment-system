# UPI Payment System - Backend

## 🔐 Project Overview

This is a backend application that simulates the core functionalities of a UPI (Unified Payments Interface) payment system, built using Java and Spring Boot. The project enables users to register, login, check balances, transfer money, and view transaction history.

---

## 🧠 Features

* ✅ User Registration with UPI ID and bank linking
* ✅ Secure Login using UPI ID and PIN
* ✅ Check current account balance
* ✅ Transfer money between users
* ✅ View all transactions (sent/received)

---

## 🛠️ Technologies Used

| Technology      | Purpose                             |
|-----------------|--------------------------------------|
| Java 17         | Primary backend language             |
| Spring Boot     | Backend framework                    |
| Spring Data JPA | ORM and database interaction         |
| MySQL           | Relational database                  |
| Maven           | Project management and build tool    |
| Lombok          | Model boilerplate reduction          |
| Postman         | API testing                          |
| HTML/CSS/JS     | Static frontend                      |
| Favicon         | Custom browser icon                  |

---

## 📁 Folder Structure

```
backend/
├── controller/          # REST endpoints (/register, /send, etc.)
├── dto/                 # Data Transfer Objects (e.g., LoginDTO)
├── model/               # JPA Entities (User, BankAccount, Transaction)
├── repository/          # Spring Data JPA interfaces
├── service/             # Core business logic
├── exception/           # (Optional) Custom exception handling
└── UpiPaymentSystemApplication.java  # Main Spring Boot app
```

---

## 🔄 API Endpoints

| Method | Endpoint                | Description                     |
| ------ | ----------------------- | ------------------------------- |
| POST   | `/register`             | Register user and create UPI ID |
| POST   | `/login`                | Login using UPI ID and PIN      |
| POST   | `/send`                 | Send money to another UPI user  |
| GET    | `/balance/{upiId}`      | Get current balance by UPI ID   |
| GET    | `/transactions/{upiId}` | Get all transactions for a user |

---

## 🧠 Future Improvements

* Add JWT-based authentication
* Add email/SMS confirmation
* Role-based access (admin, user)
* Integrate React or modern UI frontend
* Add Swagger API documentation

---

## 👨‍💻 Author

**Y Manoj Kumar**
[LinkedIn](https://www.linkedin.com/in/manojkumaryennameedhi) | [GitHub](https://github.com/YennameedhiManojKumar)

---

> 🚀 A backend project built with real-world fintech logic. Production-scalable.

# Auth App

A full-featured authentication and profile management app built with:

- **language:** TypeScript,  Javascript
- **Backend:** Express, Drizzle ORM, bcrypt, JWT
- **Frontend:** Next.js (React) with client-side hooks
- **Features:**  
  - User registration, login, and JWT-based authentication  
  - Profile viewing and updating  
  - Password change with validation  
  - Password reset via email with expiring tokens  
  - Email notifications for profile changes and password resets  

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
- [API Endpoints](#api-endpoints)  
- [Frontend Usage](#frontend-usage)  
- [Environment Variables](#environment-variables)  
- [License](#license)  

---

## Features

- Secure user authentication with JWT access & refresh tokens  
- Password hashing with bcrypt  
- Password reset via email with token expiry  
- Profile management with email update validation  
- Client-side auth state management and protected routes  
- Responsive UI with Tailwind CSS  

---

## Tech Stack

| Layer           | Technology              |
|-----------------|-------------------------|
| Backend         | Node.js, Express        |
| Database ORM    | Drizzle ORM             |
| Authentication  | JWT, bcrypt             |
| Email           | Nodemailer (custom util)|
| Frontend        | Next.js (React)         |
| Styling         | Tailwind CSS            |

---

## Getting Started

### Prerequisites

- Node.js v18+  
- PostgreSQL or compatible DB for Drizzle ORM  
- SMTP email service credentials  

### Installation

```bash
git clone https://github.com/yourusername/auth-app.git
cd auth-app
npm install

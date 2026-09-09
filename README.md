# Task Management System (Full-Stack)

A robust, production-ready task management application built with a focus on data integrity, secure authentication, and a modern user experience. This project demonstrates a complete full-stack workflow, including containerized database management, secure API design, and reactive frontend architecture.

## 🏗️ Architecture & Tech Stack

### Backend
- **Node.js & Express**: High-performance server environment.
- **Prisma ORM**: Type-safe database access and automated migrations.
- **PostgreSQL**: Reliable relational database for persistent storage.
- **JWT (JSON Web Tokens)**: Secure, stateless user authorization.
- **Bcrypt**: Advanced password hashing for industry-standard security.
- **Zod**: Strict end-to-end data validation schemas.

### Frontend
- **React (Vite)**: Optimized frontend development and efficient rendering.
- **Tailwind CSS v4**: Utility-first styling with the latest engine for high-performance UI.
- **Axios**: Centralized API communication with automated request interceptors.
- **React Router**: Client-side navigation with protected route guards.
- **Context API**: Global state management for authentication and user sessions.

### Infrastructure
- **Docker & Docker Compose**: Isolated environment for the PostgreSQL database.

## 🛡️ Key Security Features
- **Data Isolation**: Users can only access, modify, or delete their own resources.
- **Input Sanitization**: All incoming data is validated via Zod schemas before hitting the database.
- **BHP (Best Practices)**: Secure handling of environment variables, password hashing, and CORS configuration.
- **Protected Routes**: Middleware-based authorization ensures that sensitive endpoints are only accessible to authenticated users.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Docker & Docker Compose
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MACKOzKLANU/task-manager-fullstack.git
   cd task-manager-fullstack
   ```

2. **Backend Configuration:**
   Create a `.env` file in the `backend/` directory:
   ```env
   DATABASE_URL="postgresql://user:pass@localhost:5432/mydb?schema=public"
   JWT_SECRET="your_secure_random_secret"
   PORT=8000
   ```

3. **Database Setup:**
   Start the PostgreSQL container and run migrations:
   ```bash
   docker compose up -d
   cd backend
   npm install
   npx prisma migrate dev
   ```

4. **Frontend Setup:**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application
Open two terminals:
- **Backend:** `cd backend && npm run dev`
- **Frontend:** `cd frontend && npm run dev`

## 🛠️ Project Roadmap
- [x] JWT-based Authentication Flow (Register/Login)
- [x] Full CRUD functionality for Tasks
- [x] Protected Route Middleware
- [x] Responsive Dashboard UI
- [x] Task filtering and search functionality
- [ ] Global notification system (Toasts)
- [ ] User profile management

---
*Developed with a focus on clean code and engineering best practices.*

---

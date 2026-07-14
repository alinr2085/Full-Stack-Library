# 📚 Full-Stack Library

A full-stack library management system with book search, checkout, reviews, and online fee payments — built with Spring Boot and React.

![Java](https://img.shields.io/badge/Java-17-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Stripe](https://img.shields.io/badge/Payments-Stripe-purple)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

## ✨ Features

- 🔐 **Authentication** — secure sign-up/login powered by Supabase Auth (JWT-based)
- 📖 **Book catalog** — search, browse by category, and view book details
- 📦 **Checkout & returns** — borrow books, track due dates, and view loan history
- ⭐ **Reviews & ratings** — leave and read reviews for books
- 💳 **Online fee payment** — pay overdue fees securely via Stripe
- 🛠️ **Admin dashboard** — add/manage books, respond to user messages
- 💬 **Messaging system** — users can contact library admins

## 🛠️ Tech Stack

**Backend**

- Java 17, Spring Boot
- Spring Security (OAuth2 Resource Server / JWT)
- Spring Data JPA + MySQL
- Stripe Java SDK

**Frontend**

- React + TypeScript (Vite)
- Supabase JS Client (Auth)
- Stripe React SDK
- Bootstrap

## 📸 Screenshots

> _Add screenshots here once available — e.g. homepage, search page, checkout, payment page._

## 🚀 Getting Started

### Prerequisites

- Java 17+
- Maven
- Node.js 18+
- MySQL (running locally or remotely)
- A [Supabase](https://supabase.com) project (for authentication)
- A [Stripe](https://stripe.com) account (test mode is fine)
- [mkcert](https://github.com/FiloSottile/mkcert) (for local HTTPS)

### 1. Clone the repository

```bash
git clone https://github.com/alinr2085/Full-Stack-Library.git
cd Full-Stack-Library
```

### 2. Backend setup

```bash
cd backend/Library
cp src/main/resources/application-public.properties src/main/resources/application.properties
```

Open `application.properties` and make sure the placeholders (`${STRIPE_SECRET_KEY}`, `${DB_PASSWORD}`, etc.) are provided via environment variables — see [Environment Variables](#-environment-variables) below.

**Generate a local SSL certificate** (required, since the backend runs on HTTPS):

```bash
mkcert -install
mkcert localhost 127.0.0.1 ::1
openssl pkcs12 -export \
  -in localhost+2.pem \
  -inkey localhost+2-key.pem \
  -out localhost+2.p12 \
  -name localhost \
  -password pass:changeit
```

Move the generated `localhost+2.p12` into `backend/Library/src/main/resources/`.

**Run the backend:**

```bash
mvn spring-boot:run
```

The API will be available at `https://localhost:8081`.

### 3. Database setup

Create the database and run the SQL scripts in the `scripts/` folder (in order) to set up tables and sample data:

```bash
mysql -u root -p reactlibrarydatabase < ../../scripts/React-Springboot-Add-Tables-Script1.sql
mysql -u root -p reactlibrarydatabase < ../../scripts/React-Springboot-Add-Books-Script1.sql
mysql -u root -p reactlibrarydatabase < ../../scripts/React-Springboot-Add-Books-Script2.sql
mysql -u root -p reactlibrarydatabase < ../../scripts/React-Springboot-Add-Books-Script4.sql
```

### 4. Frontend setup

```bash
cd frontend/react-library
npm install
cp .env.example .env
```

Fill in your Supabase project URL and anon key in `.env`, then:

```bash
npm run dev
```

The app will be available at `https://localhost:5173`.

## 🔑 Environment Variables

### Backend (`backend/Library`)

Set these as environment variables before running the app (or via your IDE's Run Configuration):

| Variable                  | Description                                                                              |
| ------------------------- | ---------------------------------------------------------------------------------------- |
| `STRIPE_SECRET_KEY`       | Your Stripe secret key (test or live)                                                    |
| `DB_USERNAME`             | MySQL username                                                                           |
| `DB_PASSWORD`             | MySQL password                                                                           |
| `SSL_KEYSTORE_PASSWORD`   | Password used when generating the `.p12` keystore                                        |
| `SUPABASE_JWT_ISSUER_URI` | Your Supabase project's JWT issuer URI, e.g. `https://<project-ref>.supabase.co/auth/v1` |

### Frontend (`frontend/react-library/.env`)

| Variable                 | Description                     |
| ------------------------ | ------------------------------- |
| `VITE_SUPABASE_URL`      | Your Supabase project URL       |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon (public) key |

## 📁 Project Structure

```
Full-Stack-Library/
├── backend/Library/       # Spring Boot API
├── frontend/react-library/ # React + TypeScript client
├── scripts/                # SQL scripts for schema & sample data
└── certs/                  # Local SSL certs (gitignored, generate your own)
```

## 📄 License

This project is licensed under the MIT License.

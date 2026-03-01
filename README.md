# 🛍️ Shoppies

![Next.js](https://img.shields.io/badge/Next.js-App%20Router-black)
![Bun](https://img.shields.io/badge/Runtime-Bun-orange)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)
![Drizzle](https://img.shields.io/badge/ORM-Drizzle-green)
![Stripe](https://img.shields.io/badge/Payments-Stripe-purple)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

A modern full-stack e-commerce application built with **Next.js (App Router)** and powered by **Bun**.

Shoppies demonstrates a scalable architecture for production-ready online stores with authentication, optimistic UI cart updates, Stripe payments, and a structured relational database.

---

## 🚀 Tech Stack

- **Framework:** Next.js (App Router)
- **Runtime & Package Manager:** Bun
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Drizzle ORM
- **Authentication:** Clerk
- **Payments:** Stripe
- **State Management:** Zustand
- **Data Fetching:** React Query
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui

---

## ✨ Core Features

- 🛍️ Product browsing & dynamic product pages
- 🛒 Persistent cart system
- ⚡ Optimistic cart updates
- 🔐 Authentication (Clerk)
- 💳 Stripe payment integration
- 📦 Order management system
- 🗂️ Structured database schema
- 🧠 Server + Client Components architecture

---

## 🛠️ Getting Started

### Clone

```bash
git clone https://github.com/s1xine/shoppies-nextjs.git
cd shoppies-nextjs
```
#Install (Bun)
```bun install```

Setup Environment
Create .env:

```
DATABASE_URL=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
```
Run Dev Server

```bun dev```

Visit:
http://localhost:3000

🗄️ Database
Push schema using Drizzle:
```bun drizzle-kit push```

🚀 Deployment
https://shoppies-nextjs.vercel.app/

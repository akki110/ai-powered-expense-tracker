# AI-Powered Expense Tracker

A full-stack AI-powered Expense Tracker web application built with Next.js, Express.js, MongoDB, and Gemini AI. Users can manage expenses, track budgets, analyze spending patterns, and automatically extract expense details from bills, receipts, or SMS text using AI.

---

# Live Demo

Frontend: https://your-frontend-url.vercel.app

Backend API: https://your-backend-url.onrender.com

---

# Features

## Authentication
- JWT-based authentication
- User registration & login
- Protected frontend and backend routes
- Password hashing using bcryptjs

---

## Expense Management
- Add expenses
- Edit expenses
- Delete expenses
- Expense filtering by:
  - category
  - month
- Notes support

---

## AI Expense Extraction
Users can paste:
- bills
- receipts
- SMS text

The AI automatically extracts:
- amount
- category
- date

Powered by Gemini AI.

Example Input:

```txt
Paid ₹450 at Domino's on 12 May 2026
```

Example Output:

```json
{
  "amount": 450,
  "category": "Food",
  "date": "2026-05-12"
}
```

---

## Dashboard Analytics
- Total monthly spending
- Category-wise spending breakdown
- Monthly spending trends
- Budget alert indicators

---

## Budget Alerts
- Set monthly category budgets
- Warning at 80% usage
- Danger alert at 100% usage

---

## CSV Export
- Export all expenses
- Export filtered monthly expenses

---

# Tech Stack

## Frontend
- Next.js 14 (App Router)
- Tailwind CSS
- shadcn/ui
- Recharts
- Axios

---

## Backend
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Gemini AI API

---

## Deployment
- Vercel (Frontend)
- Render/Railway (Backend)
- MongoDB Atlas (Database)

---

# Project Structure

## Frontend

```txt
client/
├── app/
├── components/
├── services/
├── hooks/
├── context/
├── lib/
└── middleware.js
```

---

## Backend

```txt
server/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/
└── server.js
```

---

# Installation & Setup

## Clone Repository

```bash
git clone https://github.com/your-username/expense-tracker.git
```

---

# Backend Setup

## Navigate to backend

```bash
cd server
```

---

## Install dependencies

```bash
npm install
```

---

## Create .env file

```env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret_key

GEMINI_API_KEY=your_gemini_api_key

CLIENT_URL=http://localhost:3000
```

---

## Start backend

```bash
npm run dev
```

Backend runs on:

```txt
http://localhost:5000
```

---

# Frontend Setup

## Navigate to frontend

```bash
cd client
```

---

## Install dependencies

```bash
npm install
```

---

## Create .env.local

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## Start frontend

```bash
npm run dev
```

Frontend runs on:

```txt
http://localhost:3000
```

---

# API Endpoints

## Auth Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register user |
| POST | /api/auth/login | Login user |

---

## Expense Routes

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/expenses | Get all expenses |
| POST | /api/expenses | Create expense |
| PUT | /api/expenses/:id | Update expense |
| DELETE | /api/expenses/:id | Delete expense |
| GET | /api/expenses/export/csv | Export CSV |

---

## AI Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/ai/extract | Extract expense details |

---

## Budget Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/budget | Set budget |
| GET | /api/budget | Get budgets |

---

## Dashboard Routes

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/dashboard/summary | Dashboard summary |
| GET | /api/dashboard/trends | Monthly trends |
| GET | /api/dashboard/categories | Category breakdown |

---

# AI Prompt Strategy

The application uses Gemini AI to extract structured expense data from raw text.

Prompt example:

```txt
Extract expense details from this text.

Return ONLY valid JSON:

{
  "amount":"",
  "category":"",
  "date":""
}
```

---

# Security
- Passwords hashed using bcryptjs
- JWT authentication
- Protected API routes
- Environment variables for secrets
- No hardcoded API keys

---

# Deployment

## Frontend Deployment
Deploy frontend using:

- Vercel

---

## Backend Deployment
Deploy backend using:

- Render
OR
- Railway

---

## Database
Use:

- MongoDB Atlas

---

# Environment Variables

## Backend

```env
PORT=
MONGO_URI=
JWT_SECRET=
GEMINI_API_KEY=
CLIENT_URL=
```

---

## Frontend

```env
NEXT_PUBLIC_API_URL=
```

---

# Future Improvements
- Recurring expenses
- OCR receipt scanning
- Multi-currency support
- Email budget alerts
- Dark mode
- Advanced analytics
- AI spending insights

---

# Author

Developed by Your Name

---

# License

This project is licensed under the MIT License.

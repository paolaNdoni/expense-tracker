# Expense Tracker

A full-stack application for tracking business expenses by category with automated budget alerts.

---

## Technology Stack

**Backend:** `Node.js`, `Express`, `MongoDB`, `Mongoose`  
**Frontend:** `React`, `Axios`, `CSS3`  
**Services:** `Brevo API` (email notifications)

---

## Prerequisites

- `Node.js` v14+
- MongoDB Atlas account (free tier)
- Brevo account (optional, for email alerts)

---

## Installation

### Backend Dependencies

```bash
cd backend
npm install
```

### Frontend Dependencies

```bash
cd frontend
npm install
```

---

## Configuration

### Environment Variables

Create `backend/.env` file:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/expense-tracker
PORT=5000
BREVO_API_KEY=your_api_key_here
EMAIL_FROM=sender@example.com
EMAIL_TO=recipient@example.com
BUDGET_LIMIT=1000
```

### MongoDB Setup

1. Create free cluster at `mongodb.com/cloud/atlas`
2. Create database user with password
3. Whitelist your IP address (or allow all: `0.0.0.0/0`)
4. Get connection string and add to `.env`

### Email Setup (Optional)

1. Sign up at `brevo.com`
2. Generate API key from `Settings > SMTP & API`
3. Verify sender email address
4. Add credentials to `.env`

---

## Running the Application

### Start Backend Server

**Terminal 1:**

```bash
cd backend
npm run dev
```

Expected output:

```
Server running on port 5000
Connected to MongoDB
```

### Start Frontend Server

**Terminal 2:**

```bash
cd frontend
npm start
```

Application runs at `http://localhost:3000`

---

## Project Structure

```
expense-tracker/
├── backend/
│   ├── models/
│   │   ├── Category.js
│   │   └── Expense.js
│   ├── routes/
│   │   ├── categories.js
│   │   └── expenses.js
│   ├── services/
│   │   └── emailService.js
│   ├── server.js
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddCategory.js
│   │   │   ├── AddExpense.js
│   │   │   ├── CategoryList.js
│   │   │   └── ExpenseList.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── App.css
│   ├── public/
│   └── package.json
└── README.md
```

---

## API Documentation

### Base URL

```
http://localhost:5000/api
```

### Categories Endpoints

#### Get All Categories

**GET** `/api/categories`

Response:

```json
{
  "ok": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Food",
      "createdAt": "2024-10-28T10:30:00.000Z"
    }
  ]
}
```

#### Create Category

**POST** `/api/categories`

Request:

```json
{
  "name": "Transportation"
}
```

Response:

```json
{
  "ok": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Transportation",
    "createdAt": "2024-10-28T10:35:00.000Z"
  }
}
```

#### Delete Category

**DELETE** `/api/categories/:id`

Response:

```json
{
  "ok": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Transportation"
  }
}
```

---

### Expenses Endpoints

#### Get All Expenses

**GET** `/api/expenses`

Response:

```json
{
  "ok": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "categoryId": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "Food"
      },
      "amount": 25.50,
      "description": "Lunch meeting",
      "createdAt": "2024-10-28T12:00:00.000Z"
    }
  ]
}
```

#### Create Expense

**POST** `/api/expenses`

Request:

```json
{
  "categoryId": "507f1f77bcf86cd799439011",
  "amount": 45.00,
  "description": "Office supplies"
}
```

Response:

```json
{
  "ok": true,
  "data": {
    "_id": "507f1f77bcf86cd799439014",
    "categoryId": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Food"
    },
    "amount": 45.00,
    "description": "Office supplies",
    "createdAt": "2024-10-28T14:20:00.000Z"
  },
  "budgetExceeded": false,
  "emailSent": false
}
```

#### Delete Expense

**DELETE** `/api/expenses/:id`

Response:

```json
{
  "ok": true,
  "data": {
    "_id": "507f1f77bcf86cd799439014",
    "amount": 45.00
  }
}
```

---

### Error Response Format

All endpoints return errors in this format:

```json
{
  "ok": false,
  "error": "Error message describing the issue"
}
```

**HTTP Status Codes:**

- `200` - Success
- `201` - Resource created
- `400` - Bad request (validation error)
- `404` - Resource not found
- `500` - Server error

---

## Features

- Create and manage expense categories
- Track expenses with amount, description, and category
- View spending totals by category
- Visual budget alerts when limit exceeded
- Automated email notifications (if configured)
- Delete expenses and categories
- Real-time total expense calculation

---

## Design Decisions

### Flat Data Structure

Categories and expenses are stored in separate MongoDB collections rather than nested documents. This provides:

- Better query performance for large datasets
- Easier data manipulation and updates
- Flexibility for future features
- Alignment with MongoDB best practices

### Early Return Pattern

All route handlers use early returns for error conditions, reducing nesting and improving code readability.

```javascript
if (!name) return res.status(400).json({ ok: false, error: 'Name required' });
```

### Consistent API Response Format

All endpoints return `{ok: boolean, data/error: any}` format for predictable error handling.

### Budget Alert Implementation

Budget checking occurs synchronously during expense creation, providing immediate feedback when thresholds are crossed.

### Service Abstraction

Email functionality is encapsulated in a dedicated service module, allowing for easy provider switching.

# 💰 Expense Tracker

A full-stack expense tracking application built with React, Node.js, Express, and MongoDB. Track expenses by category and receive email alerts when you exceed your budget.

## ⏱️ Time Spent
Approximately 3.5 hours

## 🚀 Features

- ✅ Create and manage expense categories
- ✅ Add expenses with amounts and descriptions
- ✅ View total spending by category
- ✅ Email notifications when budget limit is exceeded
- ✅ Delete expenses
- ✅ Real-time budget tracking
- ✅ Clean, simple UI

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Axios for API calls
- CSS3 for styling

**Backend:**
- Node.js + Express
- MongoDB with Mongoose
- Brevo (Sendinblue) for email notifications

## 📋 Prerequisites

Before you begin, ensure you have:
- Node.js (v14 or higher)
- MongoDB Atlas account (free tier)
- Brevo account (free tier) for email notifications

## 🔧 Setup Instructions

### 1. Clone or Download the Project
```bash
mkdir expense-tracker
cd expense-tracker
```

### 2. Set Up MongoDB

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (free tier)
4. Click "Connect" → "Connect your application"
5. Copy your connection string (it looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)

### 3. Set Up Brevo (Email Service)

1. Go to [Brevo](https://www.brevo.com/)
2. Create a free account
3. Go to "SMTP & API" → "API Keys"
4. Create a new API key and copy it
5. Verify your sender email address in Brevo settings

### 4. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:
```env
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/expense-tracker
PORT=5000
BREVO_API_KEY=your-brevo-api-key-here
EMAIL_FROM=your-verified-email@example.com
EMAIL_TO=recipient@example.com
BUDGET_LIMIT=1000
```

**Important:** Replace the placeholder values with your actual credentials.

Start the backend server:
```bash
npm run dev
```

You should see:
```
🚀 Server running on port 5000
✅ Connected to MongoDB
```

### 5. Frontend Setup

Open a new terminal window:
```bash
cd frontend
npm install
npm start
```

The app will open at `http://localhost:3000`

## 📱 How to Use

1. **Add Categories:**
   - Enter a category name (e.g., "Food", "Transport", "Office Supplies")
   - Click "Add Category"

2. **Add Expenses:**
   - Select a category from the dropdown
   - Enter the amount (e.g., 25.50)
   - Add a description (e.g., "Lunch at cafe")
   - Click "Add Expense"

3. **View Expenses:**
   - Expenses are grouped by category
   - See totals for each category
   - View overall total spending

4. **Budget Alerts:**
   - When total expenses exceed $1000 (or your set limit)
   - You'll see a warning banner in the app
   - An email alert will be sent automatically

5. **Delete Expenses:**
   - Click the "Delete" button on any expense to remove it

## 📁 Project Structure
```
expense-tracker/
├── backend/
│   ├── models/
│   │   ├── Category.js          # Category data model
│   │   └── Expense.js           # Expense data model
│   ├── routes/
│   │   ├── categories.js        # Category API endpoints
│   │   └── expenses.js          # Expense API endpoints
│   ├── services/
│   │   └── emailService.js      # Email notification service
│   ├── server.js                # Express server setup
│   ├── .env                     # Environment variables (create this)
│   ├── .env.example             # Example env file
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddCategory.js   # Add category form
│   │   │   ├── AddExpense.js    # Add expense form
│   │   │   ├── CategoryList.js  # Display categories
│   │   │   └── ExpenseList.js   # Display expenses
│   │   ├── services/
│   │   │   └── api.js           # API service layer
│   │   ├── App.js               # Main app component
│   │   ├── App.css              # Styling
│   │   └── index.js             # React entry point
│   └── package.json
└── README.md
```

## 🔌 API Endpoints

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create a category
```json
  { "name": "Food" }
```

### Expenses
- `GET /api/expenses` - Get all expenses
- `POST /api/expenses` - Create an expense
```json
  {
    "categoryId": "abc123",
    "amount": 25.50,
    "description": "Lunch"
  }
```
- `DELETE /api/expenses/:id` - Delete an expense

All responses follow the pattern:
```json
{ "ok": true, "data": {...} }
// or
{ "ok": false, "error": "Error message" }
```

## 🎯 Design Decisions

1. **Flat Data Structure:** Categories and expenses are in separate collections with references, not nested. This makes queries simpler and follows MongoDB best practices.

2. **Budget Alert Timing:** Email is sent immediately when an expense pushes the total over the limit. This provides instant notification.

3. **Email Service Choice:** Used Brevo because it has a generous free tier (300 emails/day) and a simple API.

4. **Early Returns:** All route handlers use early returns for errors, making the code easier to read and maintain.

5. **Consistent API Responses:** All endpoints return `{ok, data}` or `{ok, error}` format for predictable frontend handling.

## 🧪 Testing the Email Feature

To test the email notification:

1. Set `BUDGET_LIMIT=50` in your `.env` file (lower amount for easy testing)
2. Restart the backend server
3. Add expenses totaling more than $50
4. Check your email inbox for the alert

## 🐛 Troubleshooting

**MongoDB Connection Issues:**
- Make sure your IP address is whitelisted in MongoDB Atlas
- Check that your connection string is correct
- Ensure your password doesn't contain special characters (or URL encode them)

**Email Not Sending:**
- Verify your Brevo API key is correct
- Check that your sender email is verified in Brevo
- Look at the backend console for error messages
- Make sure you're using a valid recipient email

**Frontend Can't Connect to Backend:**
- Ensure backend is running on port 5000
- Check that CORS is enabled in server.js
- Verify the API_URL in `frontend/src/services/api.js`

## 💡 Challenges Faced

1. **Email Service Integration:** Initially tested with different providers before settling on Brevo for its simple API and good free tier.

2. **Budget Alert Timing:** Decided to check budget on every expense creation rather than using a scheduled job, as it provides immediate feedback.

3. **Data Structure:** Chose to keep categories and expenses in separate collections for flexibility, even though it requires population on reads.

4. **State Management:** Kept it simple with useState rather than introducing Redux, as the app is small enough to manage state at the App level.

## 🔐 Security Notes

- Never commit your `.env` file
- Use environment variables for all sensitive data
- The `.env.example` file shows required variables without exposing secrets

## 📝 Future Improvements

If I had more time, I would add:
- Date range filtering for expenses
- Edit expense functionality
- Export expenses to CSV
- Charts/graphs for spending visualization
- Multiple budget limits per category
- User authentication

## 📄 License

This project is for educational purposes.
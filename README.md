# Expense Tracker

Full-stack expense tracking app with automated budget alerts.

## Live Demo
- **Frontend:** https://expense-tracker-frontend-szkn.onrender.com
- **Backend:** https://expense-tracker-backend-81s6.onrender.com/api

*Note: First load may take 30-60 seconds*

## Tech Stack
- **Backend:** Node.js, Express, MongoDB
- **Frontend:** React, Axios
- **Email:** Brevo API

## Quick Start

### Backend
```bash
cd backend
npm install
npm start
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## Environment Variables

Create `backend/.env`:
```
MONGODB_URI=your_mongodb_uri
PORT=5000
BREVO_API_KEY=your_api_key
EMAIL_FROM=sender@email.com
EMAIL_TO=your@email.com
BUDGET_LIMIT=1000

```

## Features
- Create/delete expense categories
- Track expenses by category
- Real-time spending totals
- Budget alerts (visual + email)
- RESTful API

## API Endpoints

**Base URL:** `https://expense-tracker-backend-81s6.onrender.com/api`

### Categories
- `GET /categories` - Get all
- `POST /categories` - Create (body: `{name}`)
- `DELETE /categories/:id` - Delete

### Expenses
- `GET /expenses` - Get all
- `POST /expenses` - Create (body: `{categoryId, amount, description}`)
- `DELETE /expenses/:id` - Delete

## Deployment (Render)

### Backend
1. New Web Service → Connect GitHub
2. Build: `npm install` | Start: `npm start`
3. Add environment variables

### Frontend
1. New Static Site → Connect GitHub
2. Build: `npm install && npm run build` | Publish: `build`
3. Update API URL in `src/services/api.js`

## Notes
- MongoDB Atlas (free tier) required
- Email alerts optional (needs Brevo account)
- Add `.env` to `.gitignore`
const axios = require('axios');

const sendBudgetAlert = async (totalExpenses) => {
  const apiKey = process.env.BREVO_API_KEY;
  const emailFrom = process.env.EMAIL_FROM;
  const emailTo = process.env.EMAIL_TO;
  const budgetLimit = process.env.BUDGET_LIMIT || 1000;

  if (!apiKey) {
    console.error('Email service not configured - missing API key');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const response = await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      {
        sender: { email: emailFrom },
        to: [{ email: emailTo }],
        subject: 'Budget Alert: Expenses Exceeded!',
        htmlContent: `
          <html>
            <body style="font-family: Arial, sans-serif; padding: 20px;">
              <h2 style="color: #dc2626;">Budget Alert!</h2>
              <p>Your total expenses have exceeded the budget limit.</p>
              <p><strong>Total Expenses:</strong> $${totalExpenses.toFixed(2)}</p>
              <p><strong>Budget Limit:</strong> $${budgetLimit}</p>
              <p><strong>Overage:</strong> $${(totalExpenses - budgetLimit).toFixed(2)}</p>
              <p style="margin-top: 20px; color: #666;">
                This is an automated alert from your Expense Tracker.
              </p>
            </body>
          </html>
        `
      },
      {
        headers: {
          'api-key': apiKey,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Budget alert email sent successfully');
    return { success: true, messageId: response.data.messageId };
  } catch (error) {
    console.error('Failed to send email alert:', error.response?.data || error.message);
    return { success: false, error: error.message };
  }
};

module.exports = { sendBudgetAlert };
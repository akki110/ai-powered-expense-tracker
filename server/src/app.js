const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const { notFound, errorHandler } = require('./middlewares/error.middleware');

const app = express();

app.use(helmet({
    crossOriginResourcePolicy: false,
}));
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health Check Route
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Expense Tracker API is running...'
    });
});

// API Routes
app.use('/api/auth', require('./routes/user.routes.js'));
app.use('/api/expenses', require('./routes/expense.routes.js'));
app.use('/api/budgets', require('./routes/budget.routes.js'));

// Error Handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;

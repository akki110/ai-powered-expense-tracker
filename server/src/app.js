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
// app.use('/api/expenses', expenseRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;

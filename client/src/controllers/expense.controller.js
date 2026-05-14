const asyncHandler = require('../middlewares/handler.middleware.js');
const ApiError = require('../utils/ApiError.js');
const ApiResponse = require('../utils/ApiResponse.js');
const expenseService = require('../services/expense.service.js');

exports.createExpense = asyncHandler(async (req, res) => {
    const expenseData = req.body;
    const userId = req.user.id; // user id from JWT

    if (!expenseData.merchant || !expenseData.amount || !expenseData.date || !expenseData.category) {
        throw new ApiError(400, "Required fields are missing");
    }

    const expense = await expenseService.createExpense(userId, expenseData);
    res.status(201).json(new ApiResponse(201, expense, "Expense created successfully"));
});

exports.createExpenseFromAI = asyncHandler(async (req, res) => {
    const { text } = req.body;
    const userId = req.user.id;

    if (!text) {
        throw new ApiError(400, "Transaction text is required");
    }

    const expense = await expenseService.createExpenseFromAI(userId, text);
    res.status(201).json(new ApiResponse(201, expense, "Expense extracted and created by AI successfully"));
});

exports.getExpenses = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const result = await expenseService.getExpenses(userId, req.query);
    res.status(200).json(new ApiResponse(200, result, "Expenses fetched successfully"));
});

exports.updateExpense = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { id } = req.params;
    const updateData = req.body;

    const expense = await expenseService.updateExpense(userId, id, updateData);
    res.status(200).json(new ApiResponse(200, expense, "Expense updated successfully"));
});

exports.deleteExpense = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { id } = req.params;

    const expense = await expenseService.deleteExpense(userId, id);
    res.status(200).json(new ApiResponse(200, {}, "Expense deleted successfully"));
});

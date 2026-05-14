const asyncHandler = require('../middlewares/handler.middleware.js');
const ApiError = require('../utils/ApiError.js');
const ApiResponse = require('../utils/ApiResponse.js');
const budgetService = require('../services/budget.service.js');

exports.createBudget = asyncHandler(async (req, res) => {
    const budgetData = req.body;
    const userId = req.user.id;

    if (!budgetData.category || !budgetData.limit) {
        throw new ApiError(400, "Category and limit are required");
    }

    const budget = await budgetService.createBudget(userId, budgetData);
    res.status(201).json(new ApiResponse(201, budget, "Budget created successfully"));
});

exports.getBudgets = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const result = await budgetService.getBudgets(userId);
    res.status(200).json(new ApiResponse(200, result, "Budgets fetched successfully"));
});

exports.updateBudget = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { id } = req.params;
    const updateData = req.body;

    const budget = await budgetService.updateBudget(userId, id, updateData);
    res.status(200).json(new ApiResponse(200, budget, "Budget updated successfully"));
});

exports.deleteBudget = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { id } = req.params;

    const budget = await budgetService.deleteBudget(userId, id);
    res.status(200).json(new ApiResponse(200, {}, "Budget deleted successfully"));
});

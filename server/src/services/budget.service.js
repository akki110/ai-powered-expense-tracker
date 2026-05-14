const Budget = require('../models/budget.model.js');
const Expense = require('../models/expense.model.js');
const ApiError = require('../utils/ApiError.js');

exports.createBudget = async (userId, budgetData) => {
    // Check if budget for category already exists for that period
    const existing = await Budget.findOne({ user: userId, category: budgetData.category, period: budgetData.period || 'monthly' });
    if (existing) {
        throw new ApiError(400, `A budget for ${budgetData.category} already exists`);
    }

    const budget = await Budget.create({
        user: userId,
        ...budgetData
    });
    return budget;
};

exports.getBudgets = async (userId) => {
    const budgets = await Budget.find({ user: userId }).sort({ createdAt: -1 });
    
    // For each budget, calculate the spent amount for the period
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    const budgetsWithSpent = await Promise.all(budgets.map(async (budget) => {
        // Case-insensitive exact match
        let matchQuery = { user: userId, category: { $regex: new RegExp(`^${budget.category}$`, 'i') } };
        
        if (budget.period === 'monthly') {
            matchQuery.date = { $gte: startOfMonth };
        } else if (budget.period === 'yearly') {
            matchQuery.date = { $gte: new Date(now.getFullYear(), 0, 1) };
        }
        
        const expenses = await Expense.find(matchQuery);
        const spent = expenses.reduce((acc, curr) => acc + curr.amount, 0);
        
        return {
            ...budget.toObject(),
            spent
        };
    }));
    
    return budgetsWithSpent;
};

exports.updateBudget = async (userId, budgetId, updateData) => {
    const budget = await Budget.findOneAndUpdate(
        { _id: budgetId, user: userId },
        updateData,
        { new: true, runValidators: true }
    );
    if (!budget) throw new ApiError(404, "Budget not found");
    return budget;
};

exports.deleteBudget = async (userId, budgetId) => {
    const budget = await Budget.findOneAndDelete({ _id: budgetId, user: userId });
    if (!budget) throw new ApiError(404, "Budget not found");
    return budget;
};

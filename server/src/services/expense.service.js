const Expense = require('../models/expense.model.js');
const ApiError = require('../utils/ApiError.js');

exports.createExpense = async (userId, expenseData) => {
    const expense = await Expense.create({
        user: userId,
        ...expenseData
    });
    return expense;
};

exports.getExpenses = async (userId, queryParams) => {
    const { page = 1, limit = 10, period, category } = queryParams;

    const query = { user: userId };

    if (category && category !== 'all' && category !== 'All Categories') {
        query.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }

    if (period && period !== 'all') {
        const now = new Date();
        let startPeriod;
        let endPeriod;
        
        if (period === 'current_month') {
            startPeriod = new Date(now.getFullYear(), now.getMonth(), 1);
        } else if (period === 'last_month') {
            startPeriod = new Date(now.getFullYear(), now.getMonth() - 1, 1);
            endPeriod = new Date(now.getFullYear(), now.getMonth(), 0);
        } else if (period === 'last_3_months') {
            startPeriod = new Date(now.getFullYear(), now.getMonth() - 3, 1);
        } else if (period === 'current_year') {
            startPeriod = new Date(now.getFullYear(), 0, 1);
        }

        if (startPeriod) {
            query.date = { $gte: startPeriod };
            if (endPeriod) {
                query.date.$lte = endPeriod;
            }
        }
    }

    const skip = (page - 1) * limit;

    const expenses = await Expense.find(query)
        .sort({ date: -1, createdAt: -1 })
        .skip(skip)
        .limit(Number(limit));

    const total = await Expense.countDocuments(query);

    return {
        expenses,
        pagination: {
            total,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(total / limit)
        }
    };
};

exports.updateExpense = async (userId, expenseId, updateData) => {
    const expense = await Expense.findOneAndUpdate(
        { _id: expenseId, user: userId },
        updateData,
        { new: true, runValidators: true }
    );
    if (!expense) throw new ApiError(404, "Expense not found");
    return expense;
};

exports.deleteExpense = async (userId, expenseId) => {
    const expense = await Expense.findOneAndDelete({ _id: expenseId, user: userId });
    if (!expense) throw new ApiError(404, "Expense not found");
    return expense;
};

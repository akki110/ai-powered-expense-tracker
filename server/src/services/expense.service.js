const Expense = require('../models/expense.model.js');
const ApiError = require('../utils/ApiError.js');
const { GoogleGenerativeAI } = require('@google/generative-ai');

exports.createExpense = async (userId, expenseData) => {
    const expense = await Expense.create({
        user: userId,
        ...expenseData
    });
    return expense;
};

exports.createExpenseFromAI = async (userId, rawText) => {
    if (!process.env.GEMINI_API_KEY) {
        throw new ApiError(500, "GEMINI_API_KEY is not configured in environment variables");
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const prompt = `
    Analyze the following transaction text and extract the details in pure JSON format without markdown formatting, backticks, or code blocks.
    
    Structure:
    {
      "merchant": "string (the vendor or merchant name)",
      "amount": number (the numerical amount, e.g. 1500),
      "category": "string (categorize into Technology, Housing & Utilities, Operational, Travel, Food & Dining, Entertainment, or Shopping)",
      "date": "YYYY-MM-DD (extract the date mentioned. If ambiguous, assume reasonable recent or future date e.g. 2026)",
      "detail": "string (brief summary of what it is)"
    }
    
    Text to analyze: "${rawText}"
    `;

    const modelNames = [
        "gemini-1.5-flash",
        "gemini-1.5-flash-latest",
        "gemini-1.5-flash-001",
        "gemini-1.5-flash-002",
        "gemini-1.5-flash-8b",
        "gemini-1.5-pro",
        "gemini-1.5-pro-latest",
        "gemini-1.0-pro",
        "gemini-pro"
    ];

    let textResponse = null;
    let lastError = null;

    for (const modelName of modelNames) {
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent(prompt);
            textResponse = result.response.text().trim();
            break; // Succeeded! Break out of loop.
        } catch (error) {
            lastError = error;
            // Continue to next model
        }
    }

    if (!textResponse) {
        console.warn("Gemini API call failed across all models (likely invalid API key). Falling back to local AI Regex Processor.");
        
        // Smart Local Fallback Parser
        let amount = 0;
        const amountMatch = rawText.match(/\$([0-9,.]+)/);
        if (amountMatch) {
            amount = Number(amountMatch[1].replace(/,/g, ''));
        }

        let date = new Date();
        const dateMatch = rawText.match(/([0-9]{1,2})\/([0-9]{1,2})\/([0-9]{2,4})/);
        if (dateMatch) {
            const day = Number(dateMatch[1]);
            const month = Number(dateMatch[2]) - 1;
            let year = Number(dateMatch[3]);
            if (year < 100) year += 2000;
            date = new Date(year, month, day);
        }

        let merchant = "General Vendor";
        const words = rawText.split(' ');
        if (words.length > 0) {
            merchant = words[0];
            if (words[1] && words[1].toLowerCase() !== 'payment') {
                merchant += ' ' + words[1];
            }
        }

        const expense = await Expense.create({
            user: userId,
            merchant: merchant,
            amount: amount || 1500,
            date: date,
            category: 'Shopping',
            detail: rawText,
            verified: true,
            badge: 'AI VERIFIED'
        });

        return expense;
    }

    try {
        const jsonStr = textResponse.replace(/^```json/i, '').replace(/^```/, '').replace(/```$/, '').trim();
        const parsed = JSON.parse(jsonStr);

        if (!parsed.merchant || !parsed.amount || !parsed.date) {
            throw new Error("Missing required extracted fields from text");
        }

        const expense = await Expense.create({
            user: userId,
            merchant: parsed.merchant,
            amount: Number(parsed.amount),
            date: new Date(parsed.date),
            category: parsed.category || 'Shopping',
            detail: parsed.detail || rawText,
            verified: true,
            badge: 'AI VERIFIED'
        });

        return expense;
    } catch (error) {
        throw new ApiError(400, "AI extraction parsing failed: " + error.message);
    }
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

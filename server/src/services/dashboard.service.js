const Expense = require('../models/expense.model.js');
const Budget = require('../models/budget.model.js');

exports.getDashboardData = async (userId) => {
    const now = new Date();
    
    // Monthly bounds
    const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
    
    // 1. Total Spending
    const currentMonthExpenses = await Expense.find({ user: userId, date: { $gte: startOfCurrentMonth } });
    const totalSpendingMonthly = currentMonthExpenses.reduce((acc, curr) => acc + curr.amount, 0);
    
    const lastMonthExpenses = await Expense.find({ user: userId, date: { $gte: startOfLastMonth, $lte: endOfLastMonth } });
    const totalSpendingLastMonth = lastMonthExpenses.reduce((acc, curr) => acc + curr.amount, 0);
    
    let spendingChange = 0;
    if (totalSpendingLastMonth > 0) {
        spendingChange = ((totalSpendingMonthly - totalSpendingLastMonth) / totalSpendingLastMonth) * 100;
    } else if (totalSpendingMonthly > 0) {
        spendingChange = 100;
    }

    // 2. Budgets
    const budgets = await Budget.find({ user: userId });
    let budgetsNearingLimit = 0;
    for (const budget of budgets) {
        let matchQuery = { user: userId, category: { $regex: new RegExp(`^${budget.category}$`, 'i') } };
        if (budget.period === 'monthly') {
            matchQuery.date = { $gte: startOfCurrentMonth };
        } else if (budget.period === 'yearly') {
            matchQuery.date = { $gte: new Date(now.getFullYear(), 0, 1) };
        }
        const bExpenses = await Expense.find(matchQuery);
        const spent = bExpenses.reduce((acc, curr) => acc + curr.amount, 0);
        if (budget.limit > 0 && (spent / budget.limit) >= 0.75) {
            budgetsNearingLimit++;
        }
    }
    
    // 3. AI Prediction
    const aiPrediction = totalSpendingMonthly > 0 ? totalSpendingMonthly * 1.15 : 0;

    // 4. Trend (Anchor to latest expense date to ensure data appears during testing)
    const latestExp = await Expense.findOne({ user: userId }).sort({ date: -1 });
    const anchorDate = latestExp && latestExp.date ? new Date(latestExp.date) : new Date();

    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const dailyTrend = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date(anchorDate);
        d.setDate(d.getDate() - i);
        const startOfDay = new Date(d.setHours(0,0,0,0));
        const endOfDay = new Date(d.setHours(23,59,59,999));
        
        const dayExpenses = await Expense.find({ user: userId, date: { $gte: startOfDay, $lte: endOfDay } });
        const val = dayExpenses.reduce((acc, curr) => acc + curr.amount, 0);
        dailyTrend.push({
            name: days[startOfDay.getDay()],
            value: val,
            isMax: false
        });
    }
    let maxValDaily = -1;
    let maxIndexDaily = -1;
    dailyTrend.forEach((t, idx) => {
        if(t.value > maxValDaily) { maxValDaily = t.value; maxIndexDaily = idx; }
    });
    if(maxIndexDaily !== -1 && maxValDaily > 0) {
        dailyTrend[maxIndexDaily].isMax = true;
    }

    // Weekly Trend (4 weeks of the month of anchorDate)
    const year = anchorDate.getFullYear();
    const month = anchorDate.getMonth();
    const weeklyTrend = [];
    for (let w = 1; w <= 4; w++) {
        const startDay = (w - 1) * 7 + 1;
        const endDay = w === 4 ? 31 : w * 7;
        const startOfWeek = new Date(year, month, startDay, 0,0,0,0);
        const endOfWeek = new Date(year, month, endDay, 23,59,59,999);
        
        const weekExpenses = await Expense.find({ user: userId, date: { $gte: startOfWeek, $lte: endOfWeek } });
        const val = weekExpenses.reduce((acc, curr) => acc + curr.amount, 0);
        weeklyTrend.push({
            name: `WK ${w}`,
            value: val,
            isMax: false
        });
    }
    let maxValWeekly = -1;
    let maxIndexWeekly = -1;
    weeklyTrend.forEach((t, idx) => {
        if(t.value > maxValWeekly) { maxValWeekly = t.value; maxIndexWeekly = idx; }
    });
    if(maxIndexWeekly !== -1 && maxValWeekly > 0) {
        weeklyTrend[maxIndexWeekly].isMax = true;
    }

    // 5. Category Breakdown (Current month)
    const categoryMap = {};
    currentMonthExpenses.forEach(e => {
        categoryMap[e.category] = (categoryMap[e.category] || 0) + e.amount;
    });
    let categoryBreakdownRaw = Object.keys(categoryMap).map(cat => ({
        name: cat,
        value: categoryMap[cat]
    })).sort((a,b) => b.value - a.value).slice(0, 3);
    
    let categoryBreakdown = [];
    const totalTop3 = categoryBreakdownRaw.reduce((acc, curr) => acc + curr.value, 0);
    if (totalTop3 > 0) {
        categoryBreakdown = categoryBreakdownRaw.map(c => ({
            name: c.name,
            value: Math.round((c.value / totalTop3) * 100)
        }));
    }

    // 6. Recent Activity
    const recentActivity = await Expense.find({ user: userId }).sort({ date: -1, createdAt: -1 }).limit(3);

    return {
        summary: {
            totalSpendingMonthly,
            spendingChange,
            activeBudgetsCount: budgets.length,
            budgetsNearingLimit,
            aiPrediction
        },
        monthlyTrend: {
            daily: dailyTrend,
            weekly: weeklyTrend
        },
        categoryBreakdown,
        recentActivity
    };
};

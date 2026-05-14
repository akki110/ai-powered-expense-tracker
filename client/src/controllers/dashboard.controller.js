const asyncHandler = require('../middlewares/handler.middleware.js');
const ApiResponse = require('../utils/ApiResponse.js');
const dashboardService = require('../services/dashboard.service.js');

exports.getDashboardData = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const result = await dashboardService.getDashboardData(userId);
    res.status(200).json(new ApiResponse(200, result, "Dashboard data fetched successfully"));
});

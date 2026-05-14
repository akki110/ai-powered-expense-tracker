const asyncHandler = require('../middlewares/handler.middleware.js');
const ApiError = require('../utils/ApiError.js');
const ApiResponse = require('../utils/ApiResponse.js');
const exportService = require('../services/export.service.js');

exports.generateExport = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { dataScope, format, startDate, endDate } = req.body;

    if (!format || !['csv', 'pdf'].includes(format)) {
        throw new ApiError(400, "Invalid or missing format. Supported formats: csv, pdf");
    }

    const exportRecord = await exportService.generateExport(userId, { dataScope: dataScope || 'all', format, startDate, endDate });
    res.status(201).json(new ApiResponse(201, exportRecord, "Export generated successfully"));
});

exports.getRecentExports = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const result = await exportService.getRecentExports(userId);
    res.status(200).json(new ApiResponse(200, result, "Recent exports fetched successfully"));
});

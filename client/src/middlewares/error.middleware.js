const ApiError = require("../utils/ApiError");

/**
 * 404 Not Found Middleware
 * Catch requests to routes that don't exist and pass a 404 ApiError to the global handler
 */
const notFound = (req, res, next) => {
    const error = new ApiError(404, `Not Found - ${req.originalUrl}`);
    next(error);
};

/**
 * Global Error Handler Middleware
 * Catches all errors passed to next() and sends a standardized JSON response
 */
const errorHandler = (err, req, res, next) => {
    let error = err;

    // If the error is not an instance of our custom ApiError class, convert it
    if (!(error instanceof ApiError)) {
        const statusCode = error.statusCode || 500;
        const message = error.message || "Internal Server Error";
        
        // Convert to ApiError, passing along any existing errors array or stack trace
        error = new ApiError(statusCode, message, error?.errors || [], error.stack);
    }

    // Log the error for server-side debugging
    console.error(`[Error] ${req.method} ${req.url} >> StatusCode:: ${error.statusCode} >> Message:: ${error.message}`);
    
    if (process.env.NODE_ENV === 'development') {
        console.error(error.stack);
    }

    // Prepare response object
    const response = {
        success: error.success,
        statusCode: error.statusCode,
        message: error.message,
        errors: error.errors,
        // Only include stack trace in development environment
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    };

    res.status(error.statusCode).json(response);
};

module.exports = { notFound, errorHandler };

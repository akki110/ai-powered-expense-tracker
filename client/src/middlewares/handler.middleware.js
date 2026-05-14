/**
 * Async handler to wrap API routes, allowing for async/await syntax without try/catch blocks
 * @param {Function} requestHandler 
 * @returns {Function} Express middleware function
 */
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
    };
};

module.exports = asyncHandler;

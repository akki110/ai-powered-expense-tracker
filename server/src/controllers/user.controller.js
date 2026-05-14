const asyncHandler = require('../middlewares/handler.middleware.js');
const ApiError = require('../utils/ApiError.js');
const ApiResponse = require('../utils/ApiResponse.js');
const { registerUserService, loginUserService } = require('../services/user.service.js');

// Secure cookie options
const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
};

exports.registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const { user, accessToken, refreshToken } = await registerUserService({ name, email, password });

    return res
        .status(201)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(201, { user, accessToken, refreshToken }, "User registered successfully")
        );
});

exports.loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    const { user, accessToken, refreshToken } = await loginUserService(email, password);

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, { user, accessToken, refreshToken }, "User logged in successfully")
        );
});

exports.logoutUser = asyncHandler(async (req, res) => {
    const logoutOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
    };

    return res
        .status(200)
        .clearCookie("accessToken", logoutOptions)
        .clearCookie("refreshToken", logoutOptions)
        .json(
            new ApiResponse(200, {}, "User logged out successfully")
        );
});

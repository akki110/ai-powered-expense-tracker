const User = require('../models/user.model.js');
const ApiError = require('../utils/ApiError.js');
const jwtUtils = require('../utils/jwt.js');

// Depending on your Node version and ESM config, you can destructure standard CJS exports.
const { generateToken, generateRefreshToken } = jwtUtils;

exports.registerUserService = async (userData) => {
    const { name, email, password } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(409, "User with this email already exists");
    }

    // Create the user
    const user = await User.create({
        name,
        email,
        password
    });

    // Generate tokens
    const accessToken = generateToken(user);
    const refreshToken = generateRefreshToken(user);

    // Save refresh token in database
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    // Fetch user without sensitive information
    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    return { user: createdUser, accessToken, refreshToken };
};

exports.loginUserService = async (email, password) => {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    // Verify password
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials");
    }

    // Generate tokens
    const accessToken = generateToken(user);
    const refreshToken = generateRefreshToken(user);

    // Update refresh token in database
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    // Fetch user without sensitive information
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    return { user: loggedInUser, accessToken, refreshToken };
};

// src/utils/jwt.js
const jwt = require('jsonwebtoken');

// 1. Access Token (Short-lived)
const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
    );
};

// 2. Refresh Token (Long-lived)
const generateRefreshToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    );
};

module.exports = { generateToken, generateRefreshToken };

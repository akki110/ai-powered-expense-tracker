const mongoose = require('mongoose');
const { Schema } = mongoose;

const expenseSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        merchant: {
            type: String,
            required: true,
            trim: true,
        },
        detail: {
            type: String,
            trim: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        category: {
            type: String,
            required: true,
            trim: true,
        },
        verified: {
            type: Boolean,
            default: false,
        },
        badge: {
            type: String,
            trim: true,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Expense", expenseSchema);
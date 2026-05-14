const mongoose = require('mongoose');
const { Schema } = mongoose;

const budgetSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        category: {
            type: String,
            required: true,
            trim: true,
        },
        limit: {
            type: Number,
            required: true,
        },
        period: {
            type: String,
            enum: ["monthly", "yearly", "weekly"],
            default: "monthly",
        },
        alertsEnabled: {
            type: Boolean,
            default: true,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Budget", budgetSchema);
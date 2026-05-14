const mongoose = require('mongoose');
const { Schema } = mongoose;

const exportSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        type: {
            type: String,
            enum: ["csv", "pdf"],
            required: true,
        },
        size: {
            type: String,
            default: "0 KB",
        },
        filePath: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Export", exportSchema);

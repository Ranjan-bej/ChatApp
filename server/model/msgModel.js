import mongoose from "mongoose"

const msgSchema = mongoose.Schema(
    {
        message: {
            text: {
                type: String
            },
        },
        users: Array,
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
    },
    {
        timestamps: true
    }
);

export const msgModel = mongoose.model("message", msgSchema);
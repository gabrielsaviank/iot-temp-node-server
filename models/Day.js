import mongoose, { Schema, model } from "mongoose";

const daySchema = new Schema({
    created: {
        type: String,
        default: Date(),
        required: true
    },
    temperatures: [{
        type: mongoose.Types.ObjectId,
        required: false,
        ref: "Temperature"
    }]
});

export const Day = model("Day", daySchema);
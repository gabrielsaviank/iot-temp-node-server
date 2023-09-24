import mongoose, { Schema, model } from "mongoose";

const temperatureSchema = new Schema({
    day: {
        type: mongoose.Types.ObjectId,
        required: false,
        ref: "Day"
    },
    measure: { type: String, required: true },
    time: {
        type: String,
        default: Date(),
        required: false
    },
});

export const Temperature = model("Temperature", temperatureSchema);

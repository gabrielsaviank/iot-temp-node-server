import mongoose, { Schema, model } from "mongoose";

const temperatureSchema = new Schema({
    day: { type: mongoose.Types.ObjectId, required: true, ref: "Day" },
    measure: { type: String, required: true },
    time: {
        type: String,
        default: () => {
            const date = new Date();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            return `${hours}:${minutes}`;
        },
        required: false
    },
});

export const Temperature = model("Temperature", temperatureSchema);

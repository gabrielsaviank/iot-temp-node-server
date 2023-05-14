import mongoose, { Schema, model } from "mongoose";

const temperatureSchema = new Schema({
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
    day: { type: mongoose.Types.ObjectId, required: true, ref: "Day" }
});

export const Temperature = model("Temperature", temperatureSchema);

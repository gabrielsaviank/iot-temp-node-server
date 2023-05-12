import { Schema, model } from "mongoose";

const temperatureSchema = new Schema({
    temperature: { type: String, required: true },
    created: { type: Date, default: Date.now(), required: false }
});

export const Temperature = model("Temperature", temperatureSchema);

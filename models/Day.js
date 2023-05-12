import mongoose, { Schema, model } from "mongoose";

const daySchema = new Schema({
    created: { type: String, default: new Date(), required: true },
    measures: [{ type: mongoose.Types.ObjectId, required: false, ref: "Measure" }]
});

export const Day = model("Day", daySchema);

import { Schema, model } from "mongoose";

const predictionSchema = new Schema({
    prediction: {
        type: String,
        required: true
    }
});

export const Prediction = model("Prediction", predictionSchema);

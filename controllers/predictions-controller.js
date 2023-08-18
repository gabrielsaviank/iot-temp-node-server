import { Prediction } from "../models/Prediction.js";

export const swapPrediction = async(predicted) => {
    try{
        const predictions = await Prediction.find();

        if(predictions.length === 0){
            const newPrediction = new Prediction({
                prediction: predicted[0]
            });

            await newPrediction.save();
        }

        const lastPrediction = await Prediction.findOneAndUpdate(
            {},
            { $set: { prediction: predicted[0] } },
            { sort: { _id: -1 }, new: true }
        );

        await lastPrediction.save();
    } catch (error){
        console.log("AlleSys - Failed to save prediction ", error);
    }
};

export const getPrediction = async(req, res, next) => {
    try{
        const prediction = await Prediction.find();

        res.send(prediction);
    } catch (error) {
        console.log("AlleSys - Error ", error);
    }
};

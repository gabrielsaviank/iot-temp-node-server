import tf from "@tensorflow/tfjs-node";

import { getLastDayTemps } from "../controllers/temperatures-controller.js";
import { swapPrediction } from "../controllers/predictions-controller.js";


const Model = async () => {
    const model = tf.sequential();

    try{
        const temps = await getLastDayTemps();

        const numSamples = temps.length;
        const numFeatures = 1;

        const xs = tf.tensor2d(temps, [numSamples, numFeatures]);
        const ys = tf.tensor1d(temps);

        model.add(tf.layers.dense({ units: 100, activation: "relu", inputShape: [numFeatures] }));
        model.add(tf.layers.dense({ units: 1, activation: "linear" }));
        model.compile({ optimizer: "sgd", loss: "meanSquaredError" });

        console.log("AlleSys - Training the Model . . .");

        await model.fit(xs, ys, {
            epochs: 100,
            callbacks: {
                onEpochEnd: (epoch, log) => console.log(`Epoch ${epoch}: loss = ${log.loss}`)
            }
        });

        const predictionInput = temps;
        const inputTensor = tf.tensor2d(predictionInput, [predictionInput.length, numFeatures]);

        const predictions = model.predict(inputTensor);

        const predictedValues = await predictions.array();
        await swapPrediction(predictedValues[0]);
        // console.log("AlleSys - Predicted Temperatures ", predictedValues[0]);
    } catch (error) {
      console.log(error);
    }

};
export default Model;

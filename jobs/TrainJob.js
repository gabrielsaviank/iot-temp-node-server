import cron from "node-cron";

import Model from "../deep-learning/index.js";

export const TrainJob = () => {
    return cron.schedule("* * * * *", () => {
        Model().then(() => {
            console.log("AlleSys - Machine Learning Job ran successfully");
        });
    }).start();
};

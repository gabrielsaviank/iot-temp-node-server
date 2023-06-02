import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import { config } from "dotenv";

import { dayRoutes } from "./routes/day-routes.js";
import { temperatureRoutes } from "./routes/temperature-routes.js";
import { connectAndSubscribeToIot } from "./controllers/connect-and-subscribe-to-iot.js";
import { readWriteIotTemperature } from "./controllers/read-write-iot-temperature.js";

const app = express();

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true, // access-control-allow-credentials:true
    optionSuccessStatus: 200
};

config({ path: "./vars/.env" });

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use("/days", dayRoutes);
app.use("/temperatures",temperatureRoutes);

const startServer = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        await connectAndSubscribeToIot("currentTemperature");
        readWriteIotTemperature();

        app.listen(5000, () => {
            console.log("AlleSys: Fetch - DB Connected and Listening on Port 5000");
        });
    } catch (error) {
        console.log("AlleSys: Error - Couldnt connect to the DB");
        console.log(error);
    }
};

// This is just for Intellij stop annoying me because of the promise;
startServer().then(() => {});


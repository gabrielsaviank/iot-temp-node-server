import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import { config } from "dotenv";

import { connectAndSubscribeToIot } from "./controllers/connect-and-subscribe-to-iot.js";
import { readIotTemperature } from "./controllers/read-iot-temperature.js";

const app = express();

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true, // access-control-allow-credentials:true
    optionSuccessStatus: 200
};

config();

const uri = `mongodb+srv://${API_USER}:${API_KEY}@cluster0.qkrqako.mongodb.net/?retryWrites=true&w=majority`;

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Declare routes here

const startServer = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        await connectAndSubscribeToIot("temp");
        readIotTemperature();

        app.listen(5000, () => {
            console.log("AlleSys: Fetch - DB Connected and Listening on Port 5000");
        });
    } catch (e) {
        console.log("AlleSys: Error - Couldnt connect to the DB");
    }
};

// This is just for Intellij stop annoying me because of the promise;
startServer().then(() => {});


import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { connectAndSubscribeToIot } from "./controllers/connect-and-subscribe-to-iot.js";
import { readIotTemperature } from "./controllers/read-iot-temperature.js";

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true, // access-control-allow-credentials:true
    optionSuccessStatus: 200
};

connectAndSubscribeToIot('temp')
    .then(() => readIotTemperature());

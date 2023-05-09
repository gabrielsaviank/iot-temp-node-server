import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { connectToIot } from "./controllers/IotConnectionController.js";
import { subscribeToTemperature } from "./controllers/IotTempsControllers.js";

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true, // access-control-allow-credentials:true
    optionSuccessStatus: 200
}

connectToIot();
subscribeToTemperature('temp');

import { Router } from "express";

import { getPrediction } from "../controllers/predictions-controller.js";

const router = Router();

router.get("/", getPrediction);

export const predictionRoutes = router;

import { Router } from "express";

import { createMeasure } from "../controllers/temperatures-controller.js";

const router = Router();

router.post("/", createMeasure);

export const temperatureRoutes = router;
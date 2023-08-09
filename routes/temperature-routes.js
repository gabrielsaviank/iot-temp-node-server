import { Router } from "express";

import { createMeasure, getMeasures } from "../controllers/temperatures-controller.js";

const router = Router();

router.get("/", getMeasures);
router.post("/", createMeasure);

export const temperatureRoutes = router;
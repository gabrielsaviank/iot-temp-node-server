import { Router } from "express";

import {
    createMeasure,
    fetchLastDayTemps,
    getMeasures
} from "../controllers/temperatures-controller.js";

const router = Router();

router.get("/", getMeasures);
router.get("/current/:id", fetchLastDayTemps);
router.post("/", createMeasure);

export const temperatureRoutes = router;

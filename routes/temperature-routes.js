import { Router } from "express";

import {
    createManuallyMeasures,
    createMeasure,
    fetchLastDayTemps,
    getMeasures
} from "../controllers/temperatures-controller.js";

const router = Router();

router.get("/", getMeasures);
router.get("/current/:id", fetchLastDayTemps);
router.post("/", createMeasure);
router.post("/manually", createManuallyMeasures);

export const temperatureRoutes = router;

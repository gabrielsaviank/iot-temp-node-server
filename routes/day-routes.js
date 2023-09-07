import { Router } from "express";

import {
    createDay,
    getDay,
    getDays,
    getCurrentDay
} from "../controllers/days-controller.js";

const router = Router();

router.get("/", getDays);
router.get("/current", getCurrentDay);
router.get("/:id", getDay);
router.post("/", createDay);

export const dayRoutes = router;

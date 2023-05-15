import { Router } from "express";

import { createDay, getDay } from "../controllers/days-controller.js";

const router = Router();

router.get("/:id", getDay);
router.post("/", createDay);

export const dayRoutes = router;

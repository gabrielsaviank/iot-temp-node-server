import { Router } from "express";

import { createDay } from "../controllers/days-controller.js";

const router = Router();

router.post("/", createDay);

export const dayRoutes = router;
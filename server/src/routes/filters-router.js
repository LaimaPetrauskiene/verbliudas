import { Router } from "express";
import {
getFilters
} from "../controllers/filters-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";

const router = Router();

router.get('/',authMiddleware, getFilters);

export default router;

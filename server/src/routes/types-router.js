import { Router } from "express";
import {
getTypes
} from "../controllers/types-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";

const router = Router();

router.get('/', authMiddleware, getTypes);

export default router;

import { Router } from "express";
import { login, register, checkEmail } from "../controllers/auth-controller.js";
import {
  getBoats,
  getBoat,
  addBoat,
  updateBoat,
  deleteBoat,
} from "../controllers/boats-controller.js";
import {createOrder} from "../controllers/order-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.get("/check-email", checkEmail);

router.get("/boats", authMiddleware, getBoats);

router.get("/boats/:id", authMiddleware, getBoat);

router.post("/boats", authMiddleware, addBoat);

router.patch("/boats/:id", authMiddleware, updateBoat);

router.delete("/boats/:id", authMiddleware, deleteBoat);

router.post("/order", authMiddleware, createOrder);

export default router;

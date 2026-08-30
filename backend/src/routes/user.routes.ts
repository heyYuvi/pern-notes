import { Router } from "express";
import { getMe, login, logout, register } from "../controllers/user.controller.js";
import protect from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/logout", protect, logout);
router.get("/getMe", protect, getMe);
router.post("/register", register);
router.post("/login", login);

export default router;


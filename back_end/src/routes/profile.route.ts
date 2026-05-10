import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { profileController } from "../controllers/profile.controller";

const router = express.Router();

router.get("", authMiddleware, profileController.profile);

export default router;

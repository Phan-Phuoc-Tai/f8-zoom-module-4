import express from "express";
import { categoryController } from "../controllers/category.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();
router.use(authMiddleware);
router.post("", categoryController.create);
router.put("/:id", categoryController.update);
router.delete("/:id", categoryController.delete);
router.get("", categoryController.findAll);
router.get("/:id", categoryController.findById);
export default router;

import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { productController } from "../controllers/product.controller";

const router = express.Router();
router.use(authMiddleware);
router.post("", productController.create);
router.put("/:id", productController.update);
router.delete("/:id", productController.delete);
router.get("", productController.findAll);
router.get("/:id", productController.findById);
export default router;

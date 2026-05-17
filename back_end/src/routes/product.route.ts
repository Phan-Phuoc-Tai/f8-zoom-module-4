import express from "express";
// import { authMiddleware } from "../middlewares/auth.middleware";
import { productController } from "../controllers/product.controller";
import { validateMiddleware } from "../middlewares/validate.middleware";
import { createProductSchema } from "../validators/product.validator";

const router = express.Router();
// router.use(authMiddleware);
router.post(
  "",
  validateMiddleware(createProductSchema),
  productController.create,
);
router.put("/:id", productController.update);
router.delete("/:id", productController.delete);
router.get("", productController.findAll);
router.get("/:id", productController.findById);
export default router;

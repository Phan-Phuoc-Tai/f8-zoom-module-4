import z from "zod";
import { PRODUCT_ERROR } from "../constants/product.constant";

export const createProductSchema = z.object({
  name: z.string().min(1, {
    message: PRODUCT_ERROR.ZOD_ERRORS.NAME,
  }),
  price: z.number().positive({ message: PRODUCT_ERROR.ZOD_ERRORS.PRICE }),
  salePrice: z.number().optional(),
  description: z.string().min(1, {
    message: PRODUCT_ERROR.ZOD_ERRORS.DESCRIPTION,
  }),
  shortDescription: z.string().optional(),
  thumbnail: z.string().min(1, {
    message: PRODUCT_ERROR.ZOD_ERRORS.THUMBNAIL,
  }),
  status: z.boolean(),
  categoryId: z.number().positive(),
  images: z.array(z.string()).min(1, {
    message: PRODUCT_ERROR.ZOD_ERRORS.IMAGES,
  }),
});

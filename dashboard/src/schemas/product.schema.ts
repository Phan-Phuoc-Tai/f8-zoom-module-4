import { PRODUCT_CONFIG } from "@/constants/product.constant";
import { DeltaStatic } from "react-quill-new";
import z from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, {
    message: PRODUCT_CONFIG.ZOD_ERRORS.NAME,
  }),
  price: z.coerce
    .number()
    .positive({ message: PRODUCT_CONFIG.ZOD_ERRORS.PRICE }),
  salePrice: z.coerce.number().optional(),
  description: z
    .transform((value: DeltaStatic) => {
      return JSON.stringify(value.ops) === `[{"insert":"\\n"}]`
        ? ""
        : JSON.stringify(value.ops);
    })
    .pipe(
      z.string().min(1, {
        message: PRODUCT_CONFIG.ZOD_ERRORS.DESCRIPTION,
      }),
    ),
  shortDescription: z.string().optional(),
  thumbnail: z.string().min(1, {
    message: PRODUCT_CONFIG.ZOD_ERRORS.THUMBNAIL,
  }),
  status: z.boolean().default(true),
  categoryId: z
    .transform((value) => (value === undefined ? 0 : +value!))
    .pipe(
      z.number().positive({ message: PRODUCT_CONFIG.ZOD_ERRORS.CATEGORY_ID }),
    ),
  images: z.array(
    z.string().min(1, {
      message: PRODUCT_CONFIG.ZOD_ERRORS.IMAGE,
    }),
  ),
});

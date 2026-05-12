import { CATEGORY_CONFIG } from "@/constants/category.constant";
import z from "zod";

export const categorySchema = z.object({
  name: z.string().trim().min(1, CATEGORY_CONFIG.ZOD_ERRORS.NAME),
  parentId: z.string().trim().min(1, CATEGORY_CONFIG.ZOD_ERRORS.PARENT_ID),
});

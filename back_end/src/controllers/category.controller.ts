import { Request, Response } from "express";
import { categoryService } from "../services/category.service";
import { successResponse } from "../utils/response";
import { CATEGORY_SUCCESS } from "../constants/category.constant";

export const categoryController = {
  create: async (request: Request, response: Response) => {
    const category = await categoryService.create(request.body);
    successResponse(response, category, CATEGORY_SUCCESS.CREATE, 201);
  },
  update: async (request: Request, response: Response) => {
    const { id } = request.params;
    const category = await categoryService.update(request.body, +id!);
    successResponse(response, category, CATEGORY_SUCCESS.UPDATE, 200);
  },
  delete: async (request: Request, response: Response) => {
    const { id } = request.params;
    const category = await categoryService.delete(+id!);
    successResponse(response, category, CATEGORY_SUCCESS.DELETE, 200);
  },
  findAll: async (request: Request, response: Response) => {
    const categories = await categoryService.findAll();
    successResponse(response, categories, CATEGORY_SUCCESS.DELETE, 200);
  },
};

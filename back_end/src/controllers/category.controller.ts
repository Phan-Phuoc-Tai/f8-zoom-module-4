import { Request, Response } from "express";
import { categoryService } from "../services/category.service";
import { successResponse } from "../utils/response";
import { CATEGORY_SUCCESS } from "../constants/category.constant";
import { CategoryQuery } from "../types/category.type";

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
  findById: async (request: Request, response: Response) => {
    const { id } = request.params;
    const category = await categoryService.findCategoryById(+id!);
    successResponse(response, category, CATEGORY_SUCCESS.FIND, 200);
  },
  findAll: async (request: Request, response: Response) => {
    const [categories, count] = await categoryService.findAll(
      request.query as unknown as CategoryQuery,
    );
    const meta = {
      total: count,
      currentPage: request.query.page ? +request.query.page : 1,
      limit: request.query.limit ? +request.query.limit : 10,
    };
    successResponse(response, categories, CATEGORY_SUCCESS.FIND_ALL, 200, meta);
  },
};

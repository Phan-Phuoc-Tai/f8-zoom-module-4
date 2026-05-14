import { Request, Response } from "express";
import { successResponse } from "../utils/response";
import { PRODUCT_SUCCESS } from "../constants/product.constant";
import { productService } from "../services/product.service";
import { ProductQuery } from "../types/product.type";

export const productController = {
  create: async (request: Request, response: Response) => {
    const category = await productService.create(request.body);
    successResponse(response, category, PRODUCT_SUCCESS.CREATE, 201);
  },
  update: async (request: Request, response: Response) => {
    const { id } = request.params;
    const category = await productService.update(request.body, +id!);
    successResponse(response, category, PRODUCT_SUCCESS.UPDATE, 200);
  },
  delete: async (request: Request, response: Response) => {
    const { id } = request.params;
    const category = await productService.delete(+id!);
    successResponse(response, category, PRODUCT_SUCCESS.DELETE, 200);
  },
  findById: async (request: Request, response: Response) => {
    const { id } = request.params;
    const category = await productService.findCategoryById(+id!);
    successResponse(response, category, PRODUCT_SUCCESS.FIND, 200);
  },

  findAll: async (request: Request, response: Response) => {
    const [categories, count] = await productService.findAll(
      request.query as unknown as ProductQuery,
    );
    const meta = {
      total: count,
      currentPage: request.query.page ? +request.query.page : 1,
      limit: request.query.limit ? +request.query.limit : 10,
    };
    successResponse(response, categories, PRODUCT_SUCCESS.FIND_ALL, 200, meta);
  },
};

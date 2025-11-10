// src/services/mock/ProductServiceMock.ts
import type { Product } from "../../types/product.types";
import { mockProducts } from "../../mocks/product.mocks";

export const ProductService = {
  async findAll(): Promise<Product[]> {
    await new Promise((res) => setTimeout(res, 500));
    return mockProducts;
  },

  async getProductsByRestaurant(restaurantId: string): Promise<Product[]> {
    await new Promise((res) => setTimeout(res, 500));
    return mockProducts.filter((p) => p.restaurantId === restaurantId);
  },
};

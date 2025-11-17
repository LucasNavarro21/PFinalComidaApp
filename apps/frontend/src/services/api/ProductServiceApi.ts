// src/services/api/ProductServiceApi.ts
import type { Product } from "../../types/product.types";
import { fetchWithAuth } from "./fetchWithAuth";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const ProductService = {
  async findAll(token: string): Promise<Product[]> {
    const res = await fetchWithAuth(BASE_URL, {}, token);
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  },

  async getProductsByRestaurant(restaurantId: number, token: string): Promise<Product[]> {
    const res = await fetchWithAuth(`${BASE_URL}?restaurantId=${restaurantId}`, {}, token);
    if (!res.ok) throw new Error("Failed to fetch products by restaurant");
    return res.json();
  },
};

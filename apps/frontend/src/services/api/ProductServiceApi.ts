import type { Product } from "../../types/product.types";

const BASE_URL = "http://localhost:3000/products"; 

export const ProductService = {
  async findAll(): Promise<Product[]> {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  },

  async getProductsByRestaurant(restaurantId: number): Promise<Product[]> {
    const res = await fetch(`${BASE_URL}?restaurantId=${restaurantId}`);
    if (!res.ok) throw new Error("Failed to fetch products by restaurant");
    return res.json();
  },
};

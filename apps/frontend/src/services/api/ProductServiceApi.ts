import type { Product } from "../../types/product.types";
import { fetchWithAuth } from "./fetchWithAuth";

const API_BASE = import.meta.env.VITE_API_BASE_URL;
const BASE_URL = `${API_BASE}/products`;

export const ProductService = {
  async create(productData: { name: string; description: string; price: number; restaurantId: string; category?: string; image?: string }, token: string): Promise<Product> {
    const res = await fetchWithAuth(
      BASE_URL,
      {
        method: "POST",
        body: JSON.stringify(productData),
        headers: { "Content-Type": "application/json" }
      },
      token
    );

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to create product: ${errorText}`);
    }

    return res.json();
  },

  async update(id: string, productData: Partial<Product>, token: string): Promise<Product> {
    const res = await fetchWithAuth(
      `${BASE_URL}/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(productData),
        headers: { "Content-Type": "application/json" }
      },
      token
    );

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to update product: ${errorText}`);
    }

    return res.json();
  },

  async delete(id: string, token: string): Promise<void> {
    const res = await fetchWithAuth(
      `${BASE_URL}/${id}`,
      {
        method: "DELETE"
      },
      token
    );

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to delete product: ${errorText}`);
    }
  },

  async findAll(token: string): Promise<Product[]> {
    const res = await fetchWithAuth(BASE_URL, {}, token);
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to fetch products: ${errorText}`);
    }
    return res.json();
  },

  async findById(id: string, token: string): Promise<Product | null> {
    const res = await fetchWithAuth(`${BASE_URL}/${id}`, {}, token);
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to fetch product: ${errorText}`);
    }
    return res.json();
  },

  async getProductsByRestaurant(restaurantId: string, token: string): Promise<Product[]> {
    const res = await fetchWithAuth(`${API_BASE}/restaurants/${restaurantId}/products`, {}, token);
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to fetch restaurant products: ${errorText}`);
    }
    return res.json();
  },
};

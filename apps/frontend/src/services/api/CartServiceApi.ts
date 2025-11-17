// src/services/api/CartServiceApi.ts
import type { CartItem } from "../../types/cart.types";
import { fetchWithAuth } from "./fetchWithAuth";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const CartService = {
  async getCart(token: string): Promise<CartItem[]> {
    const res = await fetchWithAuth(BASE_URL, {}, token);
    if (!res.ok) throw new Error("Failed to fetch cart items");
    return res.json();
  },

  async removeItem(id: number, token: string): Promise<void> {
    const res = await fetchWithAuth(`${BASE_URL}/${id}`, { method: "DELETE" }, token);
    if (!res.ok) throw new Error("Failed to remove cart item");
  },
};

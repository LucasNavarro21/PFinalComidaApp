// src/services/api/RestaurantServiceApi.ts
import type { Restaurant } from "../../types/restaurant.types";
import { fetchWithAuth } from "./fetchWithAuth";

const BASE_URL = "http://localhost:3000/restaurants";

export const RestaurantService = {
  async findAll(token: string): Promise<Restaurant[]> {
    const res = await fetchWithAuth(BASE_URL, {}, token);
    if (!res.ok) throw new Error("Failed to fetch restaurants");
    return res.json();
  },

  async findById(id: number, token: string): Promise<Restaurant | null> {
    const res = await fetchWithAuth(`${BASE_URL}/${id}`, {}, token);
    if (!res.ok) throw new Error("Failed to fetch restaurant");
    return res.json();
  },
};

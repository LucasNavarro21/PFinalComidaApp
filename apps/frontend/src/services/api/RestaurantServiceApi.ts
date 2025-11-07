// src/services/api/RestaurantServiceApi.ts
import type { Restaurant } from "../../types/restaurant.types";

const BASE_URL = "http://localhost:3000/restaurants";

export const RestaurantService = {
  async findAll(): Promise<Restaurant[]> {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error("Failed to fetch restaurants");
    return res.json();
  },

  async findById(id: number): Promise<Restaurant | null> {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) throw new Error("Failed to fetch restaurant");
    return res.json();
  },
};

import type { Restaurant } from "../../types/restaurant.types";
import { fetchWithAuth } from "./fetchWithAuth";

const API_BASE = import.meta.env.VITE_API_BASE_URL;
const BASE_URL = `${API_BASE}/restaurants`;

export const RestaurantService = {

  async create(restaurantData: Partial<Restaurant>, token: string): Promise<Restaurant> {
    const res = await fetchWithAuth(
      BASE_URL,
      {
        method: "POST",
        body: JSON.stringify(restaurantData),
        headers: { "Content-Type": "application/json" }
      },
      token
    );

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to create restaurant: ${errorText}`);
    }

    return res.json();
  },

  async findAll(token: string): Promise<Restaurant[]> {
    const res = await fetchWithAuth(BASE_URL, {}, token);
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to fetch restaurants: ${errorText}`);
    }
    return res.json();
  },

  async findById(id: string, token: string): Promise<Restaurant | null> {
    const res = await fetchWithAuth(`${BASE_URL}/${id}`, {}, token);
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to fetch restaurant: ${errorText}`);
    }
    return res.json();
  },
};

import type { Restaurant } from "../types/restaurant.types";

const API_BASE_URL = "http://localhost:3000";

export const RestaurantService = {
  async findAll(): Promise<Restaurant[]> {
    const res = await fetch(`${API_BASE_URL}/restaurants`);
    if (!res.ok) throw new Error("Error fetching restaurants");
    return res.json();
  },

  async findById(id: string): Promise<Restaurant | null> {
    const res = await fetch(`${API_BASE_URL}/restaurants/${id}`);
    if (res.status === 404) return null;
    if (!res.ok) throw new Error("Error fetching restaurant");
    return res.json();
  },

  async findByCategory(category: string): Promise<Restaurant[]> {
    const res = await fetch(`${API_BASE_URL}/restaurants/category/${category}`);
    if (!res.ok) throw new Error("Error fetching restaurants by category");
    return res.json();
  },

};

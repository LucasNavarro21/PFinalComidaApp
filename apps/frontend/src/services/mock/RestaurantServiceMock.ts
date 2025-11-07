import type { Restaurant } from "../../types/restaurant.types";
import { mockRestaurants } from "../../mocks/restaurant.mock";

export const RestaurantService = {
  async findAll(): Promise<Restaurant[]> {
    await new Promise((res) => setTimeout(res, 500));
    return mockRestaurants;
  },

  async findById(id: number): Promise<Restaurant | null> {
    await new Promise((res) => setTimeout(res, 300));
    return mockRestaurants.find((r) => r.id === String(id)) || null;
  },
};

import type { Restaurant } from "../../types/restaurant.types";
import { mockRestaurants } from "../../mocks/restaurant.mock";

export const RestaurantService = {
  async findAll(): Promise<Restaurant[]> {
    await new Promise((res) => setTimeout(res, 300));
    return mockRestaurants;
  },

  async findById(id: string): Promise<Restaurant | null> {
    await new Promise((res) => setTimeout(res, 200));
    return mockRestaurants.find((r) => r.id === id) ?? null;
  },
};

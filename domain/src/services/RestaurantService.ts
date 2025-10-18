import type { Restaurant } from "../entities/Restaurant.js";
import type { Service } from "../utils/types/Service.js";

export interface RestaurantService extends Service<Restaurant> {
  findByName: (name: string) => Promise<Restaurant | undefined>;
  findByCategory: (category: string) => Promise<Restaurant[]>;
}

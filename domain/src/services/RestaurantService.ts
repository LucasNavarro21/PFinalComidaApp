import type { Restaurant, RestaurantCategory } from "../entities/Restaurant.js";
import type { Service } from "../utils/types/Service.js";

export interface RestaurantService extends Service<Restaurant> {
  findByName: (name: string) => Promise<Restaurant | undefined>;
  findByCategory(category: RestaurantCategory): Promise<Restaurant[]>;
}

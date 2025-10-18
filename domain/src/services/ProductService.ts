import type { Product } from "../entities/Product.js";
import type { Service } from "../utils/types/Service.js";

export interface ProductService extends Service<Product> {
  findByName: (name: string) => Promise<Product | undefined>;
  findByRestaurant: (restaurantId: string) => Promise<Product[]>;
}

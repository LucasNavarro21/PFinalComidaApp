import { randomUUID } from "crypto";
import type { Restaurant } from "../../entities/Restaurant.js";
import type { RestaurantService } from "../../services/RestaurantService.js";

export class RegisterRestaurant {
  constructor(private readonly restaurantService: RestaurantService) {}

async execute(data: Omit<Restaurant, "id" | "createdAt" | "updatedAt">): Promise<Restaurant> {
    const existing = await this.restaurantService.findByName(data.name);
    if (existing) {
      throw new Error("Ya existe un restaurante con ese nombre");
    }

    const newRestaurant: Restaurant = {
      id: randomUUID(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await this.restaurantService.save(newRestaurant);

    return newRestaurant;
  }
}

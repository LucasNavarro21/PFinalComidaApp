import { Product } from "../../entities/Product.js";
import type { Restaurant } from "../../entities/Restaurant.js";
import type { RestaurantService } from "../RestaurantService.js";

export class MockedRestaurantService implements RestaurantService {
  restaurants: Restaurant[] = [];

  constructor(restaurants: Restaurant[]) {
    this.restaurants = restaurants;
  }

  async findAll() {
    return this.restaurants;
  }

  async findById(id: string) {
    return this.restaurants.find((r) => r.id === id);
  }

  async findByName(name: string) {
    return this.restaurants.find(
      (r) => r.name.toLowerCase() === name.toLowerCase()
    );
  }

  async findByCategory(category: string) {
    return this.restaurants.filter(
      (r) => r.category.toLowerCase() === category.toLowerCase()
    );
  }

  async save(data : Restaurant): Promise<Restaurant>{
    this.restaurants.push(data);
    return data;
  }

  async editOne(updated: Restaurant) {
    const index = this.restaurants.findIndex((r) => r.id === updated.id);
    if (index !== -1) {
      this.restaurants[index] = { ...this.restaurants[index], ...updated };
      return this.restaurants[index];
    }
    throw new Error("Restaurant not found");
  }

  async updateMany(data: Restaurant[]) {
    for (const r of data) {
      await this.editOne(r);
    }
    return this.restaurants;
  }

  async delete(id: string) {
    this.restaurants = this.restaurants.filter((r) => r.id !== id);
  }
}

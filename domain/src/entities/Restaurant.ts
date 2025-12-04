import type { Entity } from "../utils/types/Entity.js";
import type { Product } from "./Product.js";

export const RestaurantCategory = {
  FAST_FOOD: "FAST_FOOD",
  PIZZERIA: "PIZZERIA",
  SUSHI: "SUSHI",
  VEGETARIAN: "VEGETARIAN",
  GOURMET: "GOURMET",
} as const;

export type RestaurantCategory =
  (typeof RestaurantCategory)[keyof typeof RestaurantCategory];

export interface Restaurant extends Entity {
  name: string;
  address: string;
  phone: string;
  ownerId?: string;
  category: RestaurantCategory;
  rating: number;
  products?: Product[]; 
  orders?: any[];       
}

export type CreateRestaurantInput = Omit<Restaurant, "id" | "rating">;

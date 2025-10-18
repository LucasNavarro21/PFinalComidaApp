import type { Entity } from "../utils/types/Entity.js";

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
  category: RestaurantCategory;
  rating: number;
}

export type CreateRestaurantInput = Omit<Restaurant, "id" | "rating">;

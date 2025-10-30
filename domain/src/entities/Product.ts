import type { Entity } from "../utils/types/Entity.js";

export const ProductStatus = {
  AVAILABLE: "AVAILABLE",
  UNAVAILABLE: "UNAVAILABLE",
} as const;

export type ProductStatus = (typeof ProductStatus)[keyof typeof ProductStatus];

export interface Product extends Entity {
  name: string;
  description?: string;
  price: number;
  status: ProductStatus;
  restaurantId: string;
}

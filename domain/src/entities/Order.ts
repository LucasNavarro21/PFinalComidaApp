import type { Entity } from "../utils/types/Entity.js";
import type { OrderItem } from "./OrderItem.js";

export const OrderStatus = {
  CREATED: "CREATED",
  ACCEPTED: "ACCEPTED",
  PREPARING: "PREPARING",
  ON_THE_WAY: "ON_THE_WAY",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
} as const;

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

export interface Order extends Entity {
  userId: string; 
  restaurantId: string;
  items: OrderItem[];
  totalPrice: number;
  status: OrderStatus;
}

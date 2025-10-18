import { Entity } from "../utils/types/Entity.js";
import type { Order } from "./Order.js";

export interface Delivery extends Entity {
  userId: string;           
  currentOrderId?: string;  
  status: DeliveryStatus;
}

export const DeliveryStatus = {
  AVAILABLE: "AVAILABLE",
  BUSY: "BUSY",
  OFFLINE: "OFFLINE",
} as const;

export type DeliveryStatus = (typeof DeliveryStatus)[keyof typeof DeliveryStatus];

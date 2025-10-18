import type { Delivery } from "../entities/Delivery.js";

export interface DeliveryService {
  create(delivery: Delivery): Promise<Delivery>;
  findById(id: string): Promise<Delivery | undefined>;
  findAll(): Promise<Delivery[]>;
  update(delivery: Delivery): Promise<Delivery>;
  delete(id: string): Promise<void>;

  findAvailable(): Promise<Delivery[]>;
  assignOrder(deliveryId: string, orderId: string): Promise<Delivery>;
}

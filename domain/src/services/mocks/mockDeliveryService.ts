import { Delivery, DeliveryStatus } from "../../entities/Delivery.js";
import type { DeliveryService } from "../DeliveryService.js";
import { randomUUID } from "crypto";

export class MockedDeliveryService implements DeliveryService {
  private deliveries: Delivery[] = [];

  async create(delivery: Delivery): Promise<Delivery> {
    const newDelivery: Delivery = {
      ...delivery,
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.deliveries.push(newDelivery);
    return newDelivery;
  }

  async findById(id: string): Promise<Delivery | undefined> {
    return this.deliveries.find(d => d.id === id);
  }

  async findAll(): Promise<Delivery[]> {
    return this.deliveries;
  }

  async update(delivery: Delivery): Promise<Delivery> {
    const index = this.deliveries.findIndex(d => d.id === delivery.id);
    if (index === -1) throw new Error("Delivery no encontrado");
    this.deliveries[index] = { ...delivery, updatedAt: new Date() };
    return this.deliveries[index];
  }

  async delete(id: string): Promise<void> {
    this.deliveries = this.deliveries.filter(d => d.id !== id);
  }

  async findAvailable(): Promise<Delivery[]> {
    return this.deliveries.filter(d => d.status === DeliveryStatus.AVAILABLE);
  }

  async save(delivery: Delivery): Promise<Delivery> {
    const index = this.deliveries.findIndex(d => d.id === delivery.id);
    if (index !== -1) {
      this.deliveries[index] = { ...delivery, updatedAt: new Date() };
      return this.deliveries[index];
    } else {
      const newDelivery = {
        ...delivery,
        id: delivery.id ?? randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.deliveries.push(newDelivery);
      return newDelivery;
    }
  }

  async assignOrder(deliveryId: string, orderId: string): Promise<Delivery> {
    const delivery = await this.findById(deliveryId);
    if (!delivery) throw new Error("Delivery not found");

    if (delivery.status !== DeliveryStatus.AVAILABLE) {
      throw new Error("Delivery not available");
    }

    delivery.currentOrderId = orderId;
    delivery.status = DeliveryStatus.BUSY;
    delivery.updatedAt = new Date();

    return delivery;
  }
}

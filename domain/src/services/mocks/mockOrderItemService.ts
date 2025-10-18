import { randomUUID } from "crypto";
import type { OrderItem } from "../../entities/OrderItem.js";
import type { OrderItemService } from "../OrderItemService.js";

export class MockedOrderItemService implements OrderItemService {
  private items: OrderItem[] = [];

  async save(data: OrderItem): Promise<OrderItem> {
    const item = { ...data, id: randomUUID(), createdAt: new Date(), updatedAt: new Date() };
    this.items.push(item);
    return item;
  }

  async findAll(): Promise<OrderItem[]> {
    return this.items;
  }

  async findById(id: string): Promise<OrderItem | undefined> {
    return this.items.find((i) => i.id === id);
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((i) => i.id !== id);
  }

  async editOne(updated: OrderItem): Promise<OrderItem> {
  const index = this.items.findIndex((item) => item.id === updated.id);
  if (index === -1) throw new Error("Item no encontrado");

  this.items[index] = { ...this.items[index], ...updated, updatedAt: new Date() };
  return this.items[index];
}

async updateMany(data: OrderItem[]): Promise<OrderItem[] | undefined> {
  this.items = this.items.map((item) => {
    const updated = data.find((d) => d.id === item.id);
    return updated ? { ...item, ...updated, updatedAt: new Date() } : item;
  });
  return this.items;
}

  async findByOrderId(orderId: string): Promise<OrderItem[]> {
    return this.items.filter((i) => i.orderId === orderId);
  }
}

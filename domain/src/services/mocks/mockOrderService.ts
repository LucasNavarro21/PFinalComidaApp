import type { OrderService } from "../OrderService.js";
import type { Order } from "../../entities/Order.js";
import { randomUUID } from "crypto";

export class MockedOrderService implements OrderService {
  private orders: Order[] = []; 
  
  constructor(initialData: Order[] = []) {
    this.orders = [...initialData];
  }

  async save(data: Order): Promise<Order> {
    this.orders.push(data);
    return data;
  }

  async findById(id: string): Promise<Order | undefined> {
    return this.orders.find(order => order.id === id);
  }

  async findAll(): Promise<Order[]> {
    return this.orders;
  }

  async editOne(order: Order): Promise<Order> {
    const index = this.orders.findIndex(o => o.id === order.id);
    if (index === -1) throw new Error("Order not found");
    this.orders[index] = { ...order, updatedAt: new Date() };
    return this.orders[index];
  }

  async delete(id: string): Promise<void> {
    this.orders = this.orders.filter(o => o.id !== id);
  }

  async findByUserId(userId: string): Promise<Order[]> {
    return this.orders.filter(o => o.userId === userId);
  }

  async findByRestaurantId(restaurantId: string): Promise<Order[]> {
    return this.orders.filter(o => o.restaurantId === restaurantId);
  }

  async updateStatus(orderId: string, status: Order["status"]): Promise<Order> {
    const order = await this.findById(orderId);
    if (!order) throw new Error("Order not found");
    order.status = status;
    order.updatedAt = new Date();
    return order;
  }

   async updateMany(data: Order[]): Promise<Order[] | undefined> {
    data.forEach(order => {
      const index = this.orders.findIndex(o => o.id === order.id);
      if (index !== -1) {
        this.orders[index] = { ...order, updatedAt: new Date() };
      }
    });
    return data.length ? data : undefined;
  }
}

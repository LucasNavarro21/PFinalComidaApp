import { randomUUID } from "crypto";
import type { OrderService } from "../../services/OrderService.js";
import { Order, OrderStatus } from "../../entities/Order.js";

interface CreateOrderInput {
  userId: string;
  restaurantId: string;
}

export class CreateOrder {
  constructor(private orderService: OrderService) {}

  async execute(data: CreateOrderInput): Promise<Order> {
    const newOrder: Order = {
      id: randomUUID(),
      userId: data.userId,
      restaurantId: data.restaurantId,
      items: [],
      totalPrice: 0,
      status: OrderStatus.CREATED,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await this.orderService.save(newOrder);
    return newOrder;
  }
}

import type { OrderService } from "../../services/OrderService.js";
import type { Order } from "../../entities/Order.js";

export class ListOrders {
  constructor(private readonly orderService: OrderService) {}

  async execute(): Promise<Order[]> {
    const orders = await this.orderService.findAll();
    return orders;
  }
}

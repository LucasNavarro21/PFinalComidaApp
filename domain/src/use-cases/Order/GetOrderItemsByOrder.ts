import type { OrderItemService } from "../services/OrderItemService.js";
import type { OrderItem } from "../entities/OrderItem.js";

export class GetOrderItemsByOrder {
  constructor(private readonly orderItemService: OrderItemService) {}

  async execute(orderId: string): Promise<OrderItem[]> {
    return await this.orderItemService.findByOrderId(orderId);
  }
}

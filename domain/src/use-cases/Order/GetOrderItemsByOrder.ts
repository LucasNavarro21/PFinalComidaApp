import type { OrderItemService } from "../../services/OrderItemService";
import type { OrderItem } from "../../entities/OrderItem";

export class GetOrderItemsByOrder {
  constructor(private readonly orderItemService: OrderItemService) {}

  async execute(orderId: string): Promise<OrderItem[]> {
    return await this.orderItemService.findByOrderId(orderId);
  }
}

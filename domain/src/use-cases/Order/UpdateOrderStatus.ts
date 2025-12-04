import type { Order } from "../../entities/Order.js";
import type { OrderService } from "../../services/OrderService.js";

interface UpdateOrderStatusRequest {
  orderId: string;
  status: Order["status"];
}

export class UpdateOrderStatus {
  constructor(private readonly orderService: OrderService) {}

  async execute({ orderId, status }: UpdateOrderStatusRequest): Promise<Order> {
    const order = await this.orderService.findById(orderId);
    if (!order) throw new Error(`Order with id ${orderId} not found`);

    const updated = await this.orderService.updateStatus(orderId, status);
    return updated;
  }
}

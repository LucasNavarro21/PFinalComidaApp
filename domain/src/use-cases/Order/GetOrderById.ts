import { Order } from "../../entities/Order";
import { OrderService } from "../../services/OrderService";

export class GetOrderById {
  constructor(private orderService: OrderService) {}

  async execute(orderId: string): Promise<Order> {
    const order = await this.orderService.findById(orderId);
    if (!order) {
      throw new Error("Orden no encontrada");
    }
    return order;
  }
}

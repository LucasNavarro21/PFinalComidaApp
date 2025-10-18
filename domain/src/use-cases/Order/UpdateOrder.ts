import type { OrderService } from "../../services/OrderService.js";
import type { Order } from "../../entities/Order.js";
import { OrderStatus } from "../../entities/Order.js";

interface UpdateOrderInput {
  id: string;
  status?: OrderStatus;
  totalPrice?: number;
}

export class UpdateOrder {
  constructor(private readonly orderService: OrderService) {}

  async execute(data: UpdateOrderInput): Promise<Order> {
    const existingOrder = await this.orderService.findById(data.id);
    if (!existingOrder) {
      throw new Error("Orden no encontrada");
    }

    const updatedOrder: Order = {
      ...existingOrder,
      status: data.status ?? existingOrder.status,
      totalPrice: data.totalPrice ?? existingOrder.totalPrice,
      updatedAt: new Date(),
    };

    await this.orderService.save(updatedOrder);
    return updatedOrder;
  }
}

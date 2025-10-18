import type { DeliveryService } from "../../services/DeliveryService.js";
import type { OrderService } from "../../services/OrderService.js";
import { OrderStatus } from "../../entities/Order.js";

export class AssignOrderToDelivery {
  constructor(
    private deliveryService: DeliveryService,
    private orderService: OrderService
  ) {}

  async execute(orderId: string): Promise<void> {
    const order = await this.orderService.findById(orderId);
    if (!order) throw new Error("Orden no encontrada");
    if (order.status !== OrderStatus.CREATED)
      throw new Error("La orden no esta creada");

    const availableDeliveries = await this.deliveryService.findAvailable();

    if (!availableDeliveries || availableDeliveries.length === 0) {
      throw new Error("No hay deliveryes disponibles");
    }

    const delivery = availableDeliveries[0]!; 

    await this.deliveryService.assignOrder(delivery.id, orderId);

    order.status = OrderStatus.ON_THE_WAY;
    await this.orderService.editOne(order);
  }
}

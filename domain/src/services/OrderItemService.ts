import type { Service } from "../utils/types/Service.js";
import type { OrderItem } from "../entities/OrderItem.js";

export interface OrderItemService extends Service<OrderItem> {
  findByOrderId(orderId: string): Promise<OrderItem[]>;
}

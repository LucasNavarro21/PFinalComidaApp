import type { Order } from "../entities/Order.js";
import type { Service } from "../utils/types/Service.js";

export interface OrderService extends Service<Order> {
  findByUserId: (userId: string) => Promise<Order[]>;
  findByRestaurantId: (restaurantId: string) => Promise<Order[]>;
  updateStatus: (orderId: string, status: Order["status"]) => Promise<Order>;
  
}   

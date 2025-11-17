import { Repository } from "typeorm";
import { AppDataSource } from "../../infra/db/data-source.js";
import { OrderEntity } from "../db/entities/OrderEntity.js";
import type { Order, OrderStatus } from "@domain/entities/Order.js";
import type { OrderService } from "@domain/services/OrderService.js";

export class TypeOrmOrderService implements OrderService {
  private repository: Repository<OrderEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(OrderEntity);
  }

  private toDomain(entity: OrderEntity): Order {
    return {
      id: entity.id,
      userId: entity.userId,
      restaurantId: entity.restaurantId,
      totalPrice: entity.total, 
      status: entity.status as OrderStatus,
      items: entity.items?.map(item => ({
      id: item.id,
      orderId: item.orderId,       
      productId: item.productId,
      quantity: item.quantity,
      unitPrice: item.unitPrice,   
      subtotal: item.subtotal,     
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      })),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  async findAll(): Promise<Order[]> {
    const orders = await this.repository.find({ relations: ["items"] });
    return orders.map(this.toDomain);
  }

  async findById(id: string): Promise<Order | undefined> {
    const order = await this.repository.findOne({ where: { id }, relations: ["items"] });
    return order ? this.toDomain(order) : undefined;
  }

  async findByUserId(userId: string): Promise<Order[]> {
    const orders = await this.repository.find({ where: { userId }, relations: ["items"] });
    return orders.map(this.toDomain);
  }

  async findByRestaurantId(restaurantId: string): Promise<Order[]> {
    const orders = await this.repository.find({ where: { restaurantId }, relations: ["items"] });
    return orders.map(this.toDomain);
  }

  async save(order: Omit<Order, "id" | "totalPrice">): Promise<Order> {
    const entity = this.repository.create({
      ...order,
      total: order.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    });

    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  async updateStatus(orderId: string, status: OrderStatus): Promise<Order> {
    const order = await this.repository.findOne({ where: { id: orderId } });
    if (!order) throw new Error("Order not found");

    order.status = status;
    const updated = await this.repository.save(order);
    return this.toDomain(updated);
  }

  async editOne(order: Partial<Order>): Promise<Order> {
    const entity = this.repository.create(order); 
    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  async updateMany(data: Partial<Order>[]): Promise<Order[]> {
    return [];
    }

  async delete(id: string): Promise<void> {
  await this.repository.delete(id);
}
}

export const orderService = new TypeOrmOrderService();

import { AppDataSource } from "../db/data-source.js";
import { OrderItemEntity } from "../db/entities/OrderItem.entity.js";
import type { OrderItem } from "@domain/entities/OrderItem.js";
import type { OrderItemService } from "@domain/services/OrderItemService.js";
import { Repository } from "typeorm";
import { ProductStatus } from "@domain/entities/Product.js";

export class TypeOrmOrderItemService implements OrderItemService {
  private repository: Repository<OrderItemEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(OrderItemEntity);
  }

private toDomain(entity: OrderItemEntity): OrderItem {
  return {
    id: entity.id,
    orderId: entity.orderId,
    productId: entity.productId,
    quantity: entity.quantity,
    unitPrice: entity.unitPrice,
    subtotal: entity.subtotal,
    createdAt: entity.createdAt,
    updatedAt: entity.updatedAt,
    product: entity.product
      ? {
          id: entity.product.id,
          name: entity.product.name,
          price: entity.product.price,
          description: entity.product.description,
          status: entity.product.status as ProductStatus,
          restaurantId: entity.product.restaurantId,
          createdAt: entity.product.createdAt,
          updatedAt: entity.product.updatedAt,
        }
      : undefined,
  };
}

  private toEntity(domain: OrderItem): OrderItemEntity {
    const entity = new OrderItemEntity();
    entity.id = domain.id;
    entity.orderId = domain.orderId;
    entity.productId = domain.productId;
    entity.quantity = domain.quantity;
    entity.unitPrice = domain.unitPrice;
    entity.subtotal = domain.subtotal;
    return entity;
  }

  async save(orderItem: OrderItem): Promise<OrderItem> {
    const entity = this.toEntity(orderItem);
    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  async findAll(): Promise<OrderItem[]> {
    const items = await this.repository.find();
    return items.map(this.toDomain);
  }

  async findOne(id: string): Promise<OrderItem | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? this.toDomain(entity) : null;
  }

  async findByOrderId(orderId: string): Promise<OrderItem[]> {
    const entities = await this.repository.find({ where: { orderId } });
    return entities.map(this.toDomain);
  }

    async editOne(data: OrderItem): Promise<OrderItem> {
    const existing = await this.repository.findOne({ where: { id: data.id } });
    if (!existing) throw new Error("OrderItem no encontrado");

    const updated = this.repository.merge(existing, data);
    const saved = await this.repository.save(updated);
    return this.toDomain(saved);
    }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }


  async findById(id: string): Promise<OrderItem | undefined> {
  const entity = await this.repository.findOne({ where: { id }, relations: ["product", "order"] });
  return entity ? this.toDomain(entity) : undefined;
}

async updateMany(items: OrderItem[]): Promise<OrderItem[] | undefined> {
  if (!items || items.length === 0) return undefined;
  const entities = items.map((item) => this.toEntity(item));
  const saved = await this.repository.save(entities);
  return saved.map(this.toDomain);
}

}

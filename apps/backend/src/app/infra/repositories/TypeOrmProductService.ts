import { Repository } from "typeorm";
import type { ProductService } from "@domain/services/ProductService.js";
import type { Product, ProductStatus } from "@domain/entities/Product.js";
import { ProductEntity } from "../db/entities/ProductEntity.js";

export class TypeOrmProductService implements ProductService {
  constructor(private readonly productRepository: Repository<ProductEntity>) {}

  private toDomain(entity: ProductEntity): Product {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      price: entity.price,
      restaurantId: entity.restaurantId,
      status: entity.status as ProductStatus,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

    private toEntity(product: Product): ProductEntity {
    const entity = new ProductEntity();
    Object.assign(entity, product);
    entity.orderItems = entity.orderItems ?? [];
    return entity;
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productRepository.find({ relations: ["restaurant"] });
    return products.map(this.toDomain);
  }

  async findById(id: string): Promise<Product | undefined> {
    const product = await this.productRepository.findOne({ where: { id }, relations: ["restaurant"] });
    return product ? this.toDomain(product) : undefined;
  }

  async save(product: Product): Promise<Product> {
    const entity = this.productRepository.create(product);
    const saved = await this.productRepository.save(entity);
    return this.toDomain(saved);
  }

  async editOne(product: Product): Promise<Product> {
    await this.productRepository.save(product);
    return product;
  }

  async delete(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }

  async findByName(name: string): Promise<Product | undefined> {
  const product = await this.productRepository.findOne({ where: { name } });
  return product ? this.toDomain(product) : undefined;
}

  async updateMany(products: Product[]): Promise<Product[] | undefined> {
    if (!products || products.length === 0) return undefined;
    const entities = products.map(p => this.toEntity(p));
    const saved = await this.productRepository.save(entities);
    return Array.isArray(saved) ? saved.map(e => this.toDomain(e)) : undefined;
  }
async findByRestaurant(restaurantId: string): Promise<Product[]> {
  const products = await this.productRepository.find({ where: { restaurantId } });
  return products.map(this.toDomain);
}
}

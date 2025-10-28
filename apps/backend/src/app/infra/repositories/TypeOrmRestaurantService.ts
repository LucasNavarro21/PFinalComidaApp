import { AppDataSource } from "../../infra/db/data-source";
import { RestaurantEntity } from "../../infra/db/entities/RestaurantEntity.js";
import { Restaurant, RestaurantCategory } from "../../../../../../domain/src/entities/Restaurant.js";
import { Repository } from "typeorm";
import { ProductStatus } from "../../../../../../domain/src/entities/Product";

export class TypeOrmRestaurantService {
  private repository: Repository<RestaurantEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(RestaurantEntity);
  }

  private toDomain(entity: RestaurantEntity): Restaurant {
    return {
      id: entity.id,
      name: entity.name,
      address: entity.address,
      phone: entity.phone,
      category: entity.category,
      rating: entity.rating,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
        products: entity.products?.map(p => ({
        id: p.id,
        name: p.name,
        price: p.price,
        description: p.description,
  status: p.status as ProductStatus, 
        restaurantId: entity.id,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
        })),
      orders: entity.orders?.map(o => ({
        id: o.id,
        total: o.total,
        createdAt: o.createdAt
      }))
    };
  }

  private toEntity(domain: Restaurant): RestaurantEntity {
    const entity = new RestaurantEntity();
    entity.id = domain.id;
    entity.name = domain.name;
    entity.address = domain.address;
    entity.phone = domain.phone;
    entity.category = domain.category;
    entity.rating = domain.rating;

    return entity;
  }

  async create(data: Omit<Restaurant, "id" | "rating">): Promise<Restaurant> {
    const entity = this.repository.create({
      ...data,
      rating: 0,
    });

    const saved = await this.repository.save(entity);
    return this.toDomain(saved);
  }

  async findAll(): Promise<Restaurant[]> {
    const restaurants = await this.repository.find({
      relations: ["products", "orders"],
    });
    return restaurants.map(this.toDomain);
  }

  async findById(id: string): Promise<Restaurant | null> {
    const restaurant = await this.repository.findOne({
      where: { id },
      relations: ["products", "orders"],
    });

    return restaurant ? this.toDomain(restaurant) : null;
  }

  async update(id: string, data: Partial<Restaurant>): Promise<Restaurant | null> {
    const restaurant = await this.repository.findOne({ where: { id } });
    if (!restaurant) return null;

    Object.assign(restaurant, data);
    const updated = await this.repository.save(restaurant);
    return this.toDomain(updated);
  }

  async findByCategory(category: RestaurantCategory): Promise<Restaurant[]> {
  const restaurants = await this.repository.find({
    where: { category },
    relations: ["products", "orders"],
  });
  return restaurants.map(r => this.toDomain(r));
}

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected! > 0;
  }
}
export const restaurantService = new TypeOrmRestaurantService();

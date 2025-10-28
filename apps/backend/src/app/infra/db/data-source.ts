import "reflect-metadata";
import { DataSource } from "typeorm";
import { UserEntity } from "./entities/UserEntity.js";
import { RestaurantEntity } from "./entities/RestaurantEntity.js";
import { ProductEntity } from "./entities/ProductEntity.js";
import { OrderEntity } from "./entities/OrderEntity.js";
import { OrderItemEntity } from "./entities/OrderItem.entity.js";
export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "46681224",
  database: "pedidoscomida",
  synchronize: true,
  logging: true,
  entities: [UserEntity, RestaurantEntity, ProductEntity, OrderEntity, OrderItemEntity],
  migrations: [],
  subscribers: []
});

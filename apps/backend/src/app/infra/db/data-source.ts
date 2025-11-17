import "reflect-metadata";
import { DataSource } from "typeorm";
import { UserEntity } from "./entities/UserEntity.js";
import { RestaurantEntity } from "./entities/RestaurantEntity.js";
import { ProductEntity } from "./entities/ProductEntity.js";
import { OrderEntity } from "./entities/OrderEntity.js";
import { OrderItemEntity } from "./entities/OrderItem.entity.js";
import "dotenv/config";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [
    UserEntity,
    RestaurantEntity,
    ProductEntity,
    OrderEntity,
    OrderItemEntity
  ],
});

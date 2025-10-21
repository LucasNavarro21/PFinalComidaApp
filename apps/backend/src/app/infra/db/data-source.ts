import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User.entity.js";
import { Restaurant } from "./entities/Restaurant.entity.js";
import { Product } from "./entities/Product.entity.js";
import { Order } from "./entities/Order.entity.js";
import { OrderItem } from "./entities/OrderItem.entity.js";
export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "46681224",
  database: "pedidoscomida",
  synchronize: true,
  logging: true,
  entities: [User, Restaurant, Product, Order, OrderItem],
  migrations: [],
  subscribers: []
});

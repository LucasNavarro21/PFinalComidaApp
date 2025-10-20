import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../db/entities/User.js"; 

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./db.sqlite",
  synchronize: true, 
  logging: false,
  entities: [User], 
});

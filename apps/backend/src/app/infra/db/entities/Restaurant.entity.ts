import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Product } from "./Product.entity.js";
import { Order } from "./Order.entity.js";

export enum RestaurantCategory {
  FAST_FOOD = "FAST_FOOD",
  PIZZERIA = "PIZZERIA",
  SUSHI = "SUSHI",
  VEGETARIAN = "VEGETARIAN",
  GOURMET = "GOURMET",
}

@Entity({ name: "restaurants" })
export class Restaurant {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar" })
  name!: string;

  @Column({ type: "varchar" })
  address!: string;

  @Column({ type: "varchar" })
  phone!: string;

  @Column({ type: "varchar", default: RestaurantCategory.FAST_FOOD })
  category!: RestaurantCategory;

  @Column({ type: "float", default: 0 })
  rating!: number;

  @OneToMany(() => Product, (product) => product.restaurant)
  products!: Product[];

  @OneToMany(() => Order, (order) => order.restaurant)
  orders!: Order[];
}

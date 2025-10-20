import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Restaurant } from "./Restaurant.entity.js";

@Entity({ name: "products" })
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar" })
  name!: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "float" })
  price!: number;

  @Column({ type: "varchar" })
  restaurantId!: string;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.products)
  restaurant!: Restaurant;
}

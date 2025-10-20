import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User.entity.js";
import { Restaurant } from "./Restaurant.entity.js";
import { OrderItem } from "./OrderItem.entity.js";

@Entity({ name: "orders" })
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid" })
  userId!: string;

  @ManyToOne(() => User, (user) => user.orders)
  user!: User;

  @Column({ type: "uuid" })
  restaurantId!: string;

  @ManyToOne(() => Restaurant, (restaurant) => restaurant.orders)
  restaurant!: Restaurant;  

  @Column({ type: "varchar", default: "CREATED" })
  status!: string;

  @OneToMany(() => OrderItem, (item) => item.order)
  items!: OrderItem[];
}

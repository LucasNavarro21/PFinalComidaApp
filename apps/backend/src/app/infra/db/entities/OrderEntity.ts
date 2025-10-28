import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "./UserEntity.js";
import { RestaurantEntity } from "./RestaurantEntity.js";
import { OrderItemEntity } from "./OrderItem.entity.js";

@Entity({ name: "orders" })
export class OrderEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid" })
  userId!: string;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  user!: UserEntity;

  @Column({ type: "uuid" })
  restaurantId!: string;

  @ManyToOne(() => RestaurantEntity, (restaurant) => restaurant.orders)
  restaurant!: RestaurantEntity;

  @Column({ type: "float", default: 0 })
  total!: number;

  @Column({ type: "varchar", default: "CREATED" })
  status!: string;

  @OneToMany(() => OrderItemEntity, (item) => item.order, { cascade: true })
  items!: OrderItemEntity[];

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt!: Date;
}

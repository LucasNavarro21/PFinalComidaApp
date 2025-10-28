import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { RestaurantCategory } from "../../../../../../../domain/src/entities/Restaurant"; // importás desde el dominio
import { ProductEntity } from "./ProductEntity.js";
import { OrderEntity } from "./OrderEntity.js";

@Entity({ name: "restaurants" })
export class RestaurantEntity {
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

  @OneToMany(() => ProductEntity, (product) => product.restaurant)
  products!: ProductEntity[];

  @OneToMany(() => OrderEntity, (order) => order.restaurant)
  orders!: OrderEntity[];

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt!: Date;
}

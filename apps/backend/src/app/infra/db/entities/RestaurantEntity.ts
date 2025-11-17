import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { RestaurantCategory } from "@domain/entities/Restaurant.js";

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

  @OneToMany("ProductEntity", "restaurant")
  products!: any[];  // ProductEntity[]

  @OneToMany("OrderEntity", "restaurant")
  orders!: any[];  // OrderEntity[]

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt!: Date;
}

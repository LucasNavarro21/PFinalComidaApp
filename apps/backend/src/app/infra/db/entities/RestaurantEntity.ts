import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { RestaurantCategory } from "@domain/entities/Restaurant.js";
import { UserEntity } from "./UserEntity.js";

@Entity({ name: "restaurants" })
export class RestaurantEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar" })
  name!: string;

  @Column({ type: "varchar" })
  ownerId!: string;

  @Column({ type: "varchar" })
  address!: string;

  @Column({ type: "varchar" })
  phone!: string;

  @Column({ type: "varchar", default: RestaurantCategory.FAST_FOOD })
  category!: RestaurantCategory;

  @Column({ type: "float", default: 0 })
  rating!: number;

  @ManyToOne("UserEntity", "restaurants")
  owner!: any;

  @OneToMany("ProductEntity", "restaurant")
  products!: any[];

  @OneToMany("OrderEntity", "restaurant")
  orders!: any[];

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt!: Date;
}

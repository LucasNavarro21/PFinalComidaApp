import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert } from "typeorm";
import { Order } from "./Order.entity.js";
import bcrypt from "bcrypt";

export enum UserRole {
  CUSTOMER = "CUSTOMER",
  RESTAURANT_OWNER = "RESTAURANT_OWNER",
  DELIVERY_PERSON = "DELIVERY_PERSON",
  ADMIN = "ADMIN",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar" })
  name!: string;

  @Column({ type: "varchar", unique: true })
  email!: string;

  @Column({ type: "varchar" })
  password!: string;

  @Column({ type: "varchar", default: UserRole.CUSTOMER })
  role!: UserRole;

  @Column({ type: "varchar", default: UserStatus.ACTIVE })
  status!: UserStatus;

  @OneToMany(() => Order, (order) => order.user)
  orders!: Order[];

}

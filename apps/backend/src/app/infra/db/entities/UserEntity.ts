import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { UserRole, UserStatus } from "@domain/entities/User.js";

@Entity({ name: "users" })
export class UserEntity {
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

  @OneToMany("OrderEntity", "user")
  orders!: any[];

  @OneToMany("RestaurantEntity", "owner")
  restaurants!: any[];

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt!: Date;
}

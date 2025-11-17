import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "orders" })
export class OrderEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid" })
  userId!: string;

  @ManyToOne("UserEntity", "orders")
  user!: any;  // UserEntity

  @Column({ type: "uuid" })
  restaurantId!: string;

  @ManyToOne("RestaurantEntity", "orders")
  restaurant!: any;  // RestaurantEntity

  @Column({ type: "float", default: 0 })
  total!: number;

  @Column({ type: "varchar", default: "CREATED" })
  status!: string;

  @OneToMany("OrderItemEntity", "order", { cascade: true })
  items!: any[];  // OrderItemEntity[]

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt!: Date;
}

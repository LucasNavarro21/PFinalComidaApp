import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Order } from "./Order.entity.js";

@Entity({ name: "order_items" })
export class OrderItem {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid" })
  orderId!: string;

  @Column({ type: "varchar", nullable: true })
  product?: string;

  @Column({ type: "int" })
  quantity!: number;

  @Column({ type: "float" })
  subtotal!: number;

  @ManyToOne(() => Order, (order) => order.items)
  order!: Order;
}

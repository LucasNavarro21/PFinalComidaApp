import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "order_items" })
export class OrderItemEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid" })
  orderId!: string;

  @Column({ type: "uuid" })
  productId!: string;

  @Column({ type: "int" })
  quantity!: number;

  @Column({ type: "float", default: 0 })
  unitPrice!: number;

  @Column({ type: "float" })
  subtotal!: number;

  @ManyToOne("OrderEntity", "items", { onDelete: "CASCADE" })
  @JoinColumn({ name: "orderId" })
  order!: any;

  @ManyToOne("ProductEntity", "orderItems", { eager: true })
  @JoinColumn({ name: "productId" })
  product!: any;

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt!: Date;
}

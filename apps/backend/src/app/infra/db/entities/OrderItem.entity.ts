import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { OrderEntity } from "./OrderEntity.js";
import { ProductEntity } from "./ProductEntity.js";

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

  @Column({ type: "float" , default: 0})
  unitPrice!: number;

  @Column({ type: "float" })
  subtotal!: number;

  @CreateDateColumn({ type: "timestamp" })
    createdAt!: Date;
  
  @UpdateDateColumn({ type: "timestamp" })
    updatedAt!: Date;

  @ManyToOne(() => OrderEntity, (order) => order.items, { onDelete: "CASCADE" })
  @JoinColumn({ name: "orderId" })
  order!: OrderEntity;

  @ManyToOne(() => ProductEntity, { eager: true })
  @JoinColumn({ name: "productId" })
  product!: ProductEntity;
}

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { RestaurantEntity } from "./RestaurantEntity.js";
import { OrderItemEntity } from "./OrderItem.entity.js";

@Entity({ name: "products" })
export class ProductEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar" })
  name!: string;

  @Column({ type: "text", nullable: true })
  description?: string;

  @Column({ type: "float" })
  price!: number;

  @Column({ type: "varchar" })
  restaurantId!: string;

  @Column({ type: "varchar",   default: "AVAILABLE"})
  status!: string;

  @ManyToOne(() => RestaurantEntity, (restaurant) => restaurant.products)
  restaurant!: RestaurantEntity;

  @OneToMany(() => OrderItemEntity, (orderItem) => orderItem.product)
  orderItems!: OrderItemEntity[];

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt!: Date;
}

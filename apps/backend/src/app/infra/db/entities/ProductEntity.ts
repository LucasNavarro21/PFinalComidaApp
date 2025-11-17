import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn} from "typeorm";

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

  @ManyToOne("RestaurantEntity", "products")
  restaurant!: any;  // RestaurantEntity

  @OneToMany("OrderItemEntity", "product")
  orderItems!: any[];  // OrderItemEntity[]

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt!: Date;
}

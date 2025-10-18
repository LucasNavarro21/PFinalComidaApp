import { randomUUID } from "crypto";
import { ProductStatus, type Product } from "../../entities/Product.js";
import type { ProductService } from "../../services/ProductService.js";

interface CreateProductInput {
  restaurantId: string;
  name: string;
  description: string;
  price: number;
}

export class CreateProduct {
  constructor(private readonly productService: ProductService) {}

  async execute(data: CreateProductInput): Promise<Product> {
    if (data.price <= 0) {
      throw new Error("El precio debe ser mayor a 0");
    }

    const newProduct: Product = {
      id: randomUUID(),
      restaurantId: data.restaurantId,
      name: data.name,
      description: data.description,
      price: data.price,
      status: ProductStatus.AVAILABLE,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await this.productService.save(newProduct);
    return newProduct;
  }
}

import { ProductStatus, type Product } from "../../entities/Product.js";
import type { ProductService } from "../../services/ProductService.js";

interface RegisterProductRequest {
  name: string;
  description: string;
  price: number;
  restaurantId: string;
}

export class RegisterProduct {
  constructor(private readonly productService: ProductService) {}

  async execute(data: RegisterProductRequest): Promise<Product> {
    const existingProduct = await this.productService.findByName(data.name);

    if (existingProduct) {
      throw new Error("Ya existe un producto con ese nombre");
    }

    const newProduct: Product = {
      id: crypto.randomUUID(),
      name: data.name,
      description: data.description,
      price: data.price,
      restaurantId: data.restaurantId,
      status: ProductStatus.AVAILABLE,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await this.productService.save(newProduct);
    return newProduct;
  }
}

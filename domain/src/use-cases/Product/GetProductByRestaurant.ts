// usecases/GetProductsByRestaurant.ts
import type { Product } from "../entities/Product.js";
import type { ProductService } from "../services/ProductService.js";

export class GetProductsByRestaurant {
  constructor(private readonly productService: ProductService) {}

  async execute(restaurantId: string): Promise<Product[]> {
    const products = await this.productService.findByRestaurant(restaurantId);

    if (!products.length) {
      throw new Error("No se encontraron productos para este restaurante");
    }

    return products;
  }
}

import type { ProductService } from "../../services/ProductService.js";
import type { Product } from "../../entities/Product.js";

export class DeleteProduct {
  constructor(private readonly productService: ProductService) {}

  async execute(id: string): Promise<Product> {
    const existingProduct = await this.productService.findById(id);
    if (!existingProduct) {
      throw new Error(`Producto con id ${id} no encontrado`);
    }

    await this.productService.delete(id);
    return existingProduct; 
  }
}

import type { ProductService } from "../../services/ProductService.js";
import type { Product, ProductStatus } from "../../entities/Product.js";

interface EditProductInput {
  id: string;
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  status?: ProductStatus;
}

export class EditProduct {
  constructor(private readonly productService: ProductService) {}

  async execute(data: EditProductInput): Promise<Product> {
    const existingProduct = await this.productService.findById(data.id);
    if (!existingProduct) {
      throw new Error(`Producto con id ${data.id} no encontrado`);
    }

    if (data.price !== undefined && data.price <= 0) {
      throw new Error("El precio debe ser mayor a 0");
    }

    const updatedProduct: Product = {
      ...existingProduct,
      ...data,
      updatedAt: new Date(),
    };

    await this.productService.editOne(updatedProduct);
    return updatedProduct;
  }
}

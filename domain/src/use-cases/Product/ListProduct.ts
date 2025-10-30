import type { ProductService } from "../../services/ProductService.js";
import type { Product } from "../../entities/Product.js";

export class ListProducts {
  constructor(private readonly productService: ProductService) {}

  async execute(filters?: {
    restaurantId?: string;
    status?: string;
  }): Promise<Product[]> {
    const allProducts = await this.productService.findAll();

    if (filters) {
      return allProducts.filter((product) => {
        const matchRestaurant =
          !filters.restaurantId || product.restaurantId === filters.restaurantId;
        const matchStatus =
          !filters.status || product.status === filters.status;


        return matchRestaurant && matchStatus;
      });
    }

    return allProducts;
  }
}

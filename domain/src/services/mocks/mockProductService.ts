import { ProductStatus, type Product } from "../../entities/Product.js";
import type { ProductService } from "../ProductService.js";

export class MockedProductService implements ProductService {
  private products: Product[] = [];

  constructor(initialProducts: Product[] = []) {
    this.products = initialProducts;
  }

  async findById(id: string) {
    return this.products.find((p) => p.id === id);
  }

  async findAll() {
    return this.products;
  }

  async findByName(name: string) {
    return this.products.find((p) => p.name === name);
  }

  async findByRestaurant(restaurantId: string) {
    return this.products.filter((p) => p.restaurantId === restaurantId);
  }

  async save(data: Product): Promise<Product> {
  this.products.push(data);
  return data;
  }

  async editOne(data: Product) {
    const index = this.products.findIndex((p) => p.id === data.id);
    if (index === -1) throw new Error("Producto no encontrado");
    this.products[index] = { ...this.products[index], ...data };
    return this.products[index];
  }

  async updateMany(data: Product[]) {
    data.forEach((prod) => this.editOne(prod));
    return this.products;
  }

  async delete(id: string) {
    this.products = this.products.filter((p) => p.id !== id);
  }
}

import { describe, it, expect, beforeEach } from "vitest";
import { MockedProductService } from "../../services/mocks/mockProductService.js";
import { CreateProduct } from "./CreateProduct.js";
import { ProductStatus } from "../../entities/Product.js";

describe("CreateProduct Use Case", () => {
  let productService: MockedProductService;
  let createProduct: CreateProduct;

  beforeEach(() => {
    productService = new MockedProductService();
    createProduct = new CreateProduct(productService);
  });

  it("debería crear un nuevo producto correctamente", async () => {
    const product = await createProduct.execute({
      restaurantId: "r1",
      name: "Pizza Margarita",
      description: "Clásica con tomate y albahaca",
      price: 1200,
    });

    expect(product.name).toBe("Pizza Margarita");
    expect(product.status).toBe(ProductStatus.AVAILABLE);
    expect(product.price).toBeGreaterThan(0);
  });

  it("debería lanzar un error si el precio es menor o igual a 0", async () => {
    await expect(
      createProduct.execute({
        restaurantId: "r1",
        name: "Agua",
        description: "Botella de agua",
        price: 0,
      })
    ).rejects.toThrow("El precio debe ser mayor a 0");
  });
});

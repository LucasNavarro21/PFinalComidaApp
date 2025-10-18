import { describe, it, expect, beforeEach } from "vitest";
import { MockedProductService } from "../../services/mocks/mockProductService.js";
import { RegisterProduct } from "./RegisterProduct.js";
import { ProductStatus } from "../../entities/Product.js";

describe("RegisterProduct Use Case", () => {
  let productService: MockedProductService;
  let registerProduct: RegisterProduct;

  beforeEach(() => {
    productService = new MockedProductService([]);
    registerProduct = new RegisterProduct(productService);
  });

  it("debería registrar un nuevo producto correctamente", async () => {
    const product = await registerProduct.execute({
      name: "Pizza Napolitana",
      description: "Pizza con tomate, mozzarella y albahaca",
      price: 10.99,
      restaurantId: "resto-123",
    });

    expect(product.name).toBe("Pizza Napolitana");
    expect(product.status).toBe(ProductStatus.AVAILABLE);
    expect(product.restaurantId).toBe("resto-123");
  });

  it("no debería permitir registrar un producto con nombre duplicado", async () => {
    await registerProduct.execute({
      name: "Hamburguesa",
      description: "Clásica con queso",
      price: 8.5,
      restaurantId: "resto-123",
    });

    await expect(
      registerProduct.execute({
        name: "Hamburguesa",
        description: "Con bacon",
        price: 9.0,
        restaurantId: "resto-123",
      })
    ).rejects.toThrow("Ya existe un producto con ese nombre");
  });
});

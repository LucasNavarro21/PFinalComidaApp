import { describe, it, expect, beforeEach } from "vitest";
import { MockedProductService } from "../../services/mocks/mockProductService.js";
import { EditProduct } from "./EditProduct.js";
import { ProductStatus } from "../../entities/Product.js";

describe("EditProduct Use Case", () => {
  let productService: MockedProductService;
  let editProduct: EditProduct;

  beforeEach(() => {
    productService = new MockedProductService([
      {
        id: "p1",
        name: "Hamburguesa",
        description: "Con queso",
        price: 500,
        restaurantId: "r1",
        status: ProductStatus.AVAILABLE,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    editProduct = new EditProduct(productService);
  });

  it("debería actualizar un producto correctamente", async () => {
    const updated = await editProduct.execute({
      id: "p1",
      name: "Hamburguesa doble",
      price: 700,
    });

    expect(updated.name).toBe("Hamburguesa doble");
    expect(updated.price).toBe(700);
  });

  it("debería lanzar un error si el producto no existe", async () => {
    await expect(
      editProduct.execute({ id: "inexistente", name: "Nada" })
    ).rejects.toThrow("Producto con id inexistente no encontrado");
  });

  it("debería lanzar un error si el precio es menor o igual a 0", async () => {
    await expect(
      editProduct.execute({ id: "p1", price: 0 })
    ).rejects.toThrow("El precio debe ser mayor a 0");
  });
});

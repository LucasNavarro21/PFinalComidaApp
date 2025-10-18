import { describe, it, expect, beforeEach } from "vitest";
import { MockedProductService } from "../../services/mocks/mockProductService.js";
import { DeleteProduct } from "./DeleteProduct.js";
import { ProductStatus } from "../../entities/Product.js";

describe("DeleteProduct Use Case", () => {
  let productService: MockedProductService;
  let deleteProduct: DeleteProduct;

  beforeEach(() => {
    productService = new MockedProductService();
    deleteProduct = new DeleteProduct(productService);
  });

  it("debería eliminar un producto existente", async () => {
    const product = await productService.save({
      id: "p1",
      name: "Pizza",
      description: "Pizza de muzzarella",
      price: 1000,
      status: ProductStatus.AVAILABLE,
      restaurantId: "r1",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const deleted = await deleteProduct.execute("p1");

    expect(deleted.id).toBe("p1");
    const found = await productService.findById("p1");
    expect(found).toBeUndefined(); 
  });

  it("debería lanzar un error si el producto no existe", async () => {
    await expect(deleteProduct.execute("fake-id")).rejects.toThrow(
      "Producto con id fake-id no encontrado"
    );
  });
});

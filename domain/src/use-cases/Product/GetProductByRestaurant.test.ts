import { describe, it, expect, beforeEach } from "vitest";
import { MockedProductService } from "../../services/mocks/mockProductService.js";
import { GetProductsByRestaurant } from "./GetProductByRestaurant.js";
import { ProductStatus } from "../../entities/Product.js";

describe("GetProductsByRestaurant", () => {
  let productService: MockedProductService;
  let getProductsByRestaurant: GetProductsByRestaurant;

  beforeEach(() => {
    productService = new MockedProductService();
    getProductsByRestaurant = new GetProductsByRestaurant(productService);
  });

  it("debería devolver los productos de un restaurante", async () => {
    await productService.save({
      id: "1",
      restaurantId: "rest-1",
      name: "Pizza Muzza",
      price: 1200,
      description: "PIZZA",
      status : ProductStatus.AVAILABLE,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await getProductsByRestaurant.execute("rest-1");
    expect(result).toHaveLength(1);
    expect(result[0]?.name).toBe("Pizza Muzza");
  });
});

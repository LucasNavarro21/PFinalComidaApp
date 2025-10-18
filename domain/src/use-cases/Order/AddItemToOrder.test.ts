import { AddItemToOrder } from "./AddItemToOrder";
import { MockedOrderService } from "../../services/mocks/mockOrderService";
import { MockedProductService } from "../../services/mocks/mockProductService";
import { MockedOrderItemService } from "../../services/mocks/mockOrderItemService";
import { describe, it, expect, beforeEach } from "vitest";
import { OrderStatus } from "../../entities/Order";
import { ProductStatus } from "../../entities/Product";

describe("AddItemToOrder", () => {
  let orderService: MockedOrderService;
  let productService: MockedProductService;
  let orderItemService: MockedOrderItemService;
  let useCase: AddItemToOrder;

  beforeEach(() => {
    orderService = new MockedOrderService();
    productService = new MockedProductService();
    orderItemService = new MockedOrderItemService();

    useCase = new AddItemToOrder(orderService, productService, orderItemService);
  });

  it("Deberia agregar un item a una orden existente", async () => {
    const order = await orderService.save({
      id: "1",
      userId: "user-1",
      restaurantId: "rest-1",
      items: [],
      totalPrice: 0,
      status: OrderStatus.CREATED,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const product = await productService.save({
      id: "p1",
      restaurantId: "rest-1",
      name: "Pizza Muzza",
      price: 100,
      description: "Deliciosa",
      status: ProductStatus.AVAILABLE,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const item = await useCase.execute({
      orderId: "1",
      productId: "p1",
      quantity: 2,
    });

    expect(item.subtotal).toBe(200);
    expect(order.totalPrice).toBe(200);
    expect(order.items).toHaveLength(1);
    expect(order.items[0]?.productId).toBe("p1");
  });
});

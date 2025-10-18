import { describe, it, expect, beforeEach } from "vitest";
import { MockedOrderItemService } from "../../services/mocks/mockOrderItemService.js";
import { GetOrderItemsByOrder } from "./GetOrderItemsByOrder.js";

describe("GetOrderItemsByOrder", () => {
  let orderItemService: MockedOrderItemService;
  let getOrderItemsByOrder: GetOrderItemsByOrder;

  beforeEach(() => {
    orderItemService = new MockedOrderItemService();
    getOrderItemsByOrder = new GetOrderItemsByOrder(orderItemService);
  });

  it("debería devolver los ítems asociados a una orden", async () => {
    await orderItemService.save({
      id: "1",
      orderId: "order-1",
      productId: "prod-1",
      quantity: 2,
      unitPrice: 1000,
      subtotal: 2000,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await getOrderItemsByOrder.execute("order-1");

    expect(result).toHaveLength(1);
    expect(result[0]?.subtotal).toBe(2000);
  });
});

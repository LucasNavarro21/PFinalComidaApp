import { describe, it, expect, beforeEach } from "vitest";
import { MockedOrderService } from "../../services/mocks/mockOrderService.js";
import { CreateOrder } from "./CreateOrder.js";
import { OrderStatus } from "../../entities/Order.js";

describe("CreateOrder Use Case", () => {
  let orderService: MockedOrderService;
  let createOrder: CreateOrder;

  beforeEach(() => {
    orderService = new MockedOrderService();
    createOrder = new CreateOrder(orderService);
  });

  it("debería crear una nueva orden correctamente", async () => {
    const order = await createOrder.execute({
      userId: "user-1",
      restaurantId: "rest-1",
    });

    expect(order.userId).toBe("user-1");
    expect(order.restaurantId).toBe("rest-1");
    expect(order.items).toHaveLength(0);
    expect(order.totalPrice).toBe(0);
    expect(order.status).toBe(OrderStatus.CREATED);
  });
});

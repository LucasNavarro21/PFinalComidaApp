import { describe, it, expect, beforeEach } from "vitest";
import { ListOrders } from "./ListOrders.js";
import { MockedOrderService } from "../../services/mocks/mockOrderService.js";
import { OrderStatus } from "../../entities/Order.js";

describe("ListOrders Use Case", () => {
  let orderService: MockedOrderService;
  let listOrders: ListOrders;

  beforeEach(() => {
    const mockOrders = [
      {
        id: "1",
        userId: "user1",
        restaurantId: "rest1",
        items: [],
        totalPrice: 30,
        status: OrderStatus.CREATED,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2",
        userId: "user2",
        restaurantId: "rest1",
        items: [],
        totalPrice: 50,
        status: OrderStatus.DELIVERED,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    orderService = new MockedOrderService(mockOrders);
    listOrders = new ListOrders(orderService);
  });

  it("debería listar todas las órdenes", async () => {
    const orders = await listOrders.execute();

    expect(orders).toHaveLength(2);
    expect(orders[0]!.id).toBe("1");
    expect(orders[1]!.status).toBe(OrderStatus.DELIVERED);
  });
});

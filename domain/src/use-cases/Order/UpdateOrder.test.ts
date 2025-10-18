import { describe, it, expect, beforeEach } from "vitest";
import { MockedOrderService } from "../../services/mocks/mockOrderService.js";
import { UpdateOrder } from "./UpdateOrder.js";
import { OrderStatus } from "../../entities/Order.js";
import { randomUUID } from "crypto";

describe("UpdateOrder Use Case", () => {
  let orderService: MockedOrderService;
  let updateOrder: UpdateOrder;

  beforeEach(() => {
    orderService = new MockedOrderService();
    updateOrder = new UpdateOrder(orderService);
  });

  it("debería actualizar el estado de una orden existente", async () => {
    const order = {
      id: randomUUID(),
      userId: "user-1",
      restaurantId: "rest-1",
      items: [],
      totalPrice: 100,
      status: OrderStatus.CREATED,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await orderService.save(order);

    const updated = await updateOrder.execute({
      id: order.id,
      status: OrderStatus.DELIVERED,
    });

    expect(updated.status).toBe(OrderStatus.DELIVERED);
    expect(updated.updatedAt.getTime()).toBeGreaterThanOrEqual(order.updatedAt.getTime());
  });

  it("debería lanzar un error si la orden no existe", async () => {
    await expect(
      updateOrder.execute({
        id: "fake-id",
        status: OrderStatus.DELIVERED,
      })
    ).rejects.toThrow("Orden no encontrada");
  });
});

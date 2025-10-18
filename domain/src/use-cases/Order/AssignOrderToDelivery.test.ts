import { describe, it, expect, beforeEach, vi } from "vitest";
import { AssignOrderToDelivery } from "./AssignOrderToDelivery";
import { MockedOrderService } from "../../services/mocks/mockOrderService";
import { MockedDeliveryService } from "../../services/mocks/mockDeliveryService";
import { OrderStatus } from "../../entities/Order";

describe("AssignOrderToDelivery", () => {
  let orderService: MockedOrderService;
  let deliveryService: MockedDeliveryService;
  let useCase: AssignOrderToDelivery;

  beforeEach(() => {
    orderService = new MockedOrderService();
    deliveryService = new MockedDeliveryService();
    useCase = new AssignOrderToDelivery(deliveryService, orderService);
  });

  it("debería asignar la orden a un delivery disponible", async () => {
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

    await deliveryService.save({
      id: "d1",
      userId: "delivery-1",
      status: "AVAILABLE",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
  // 👈 Aquí es donde creas el spy
  const spyAssign = vi.spyOn(deliveryService, "assignOrder");

  await useCase.execute("1");

  const updatedOrder = await orderService.findById("1");
  expect(updatedOrder?.status).toBe(OrderStatus.ON_THE_WAY);

  // 👈 Ahora sí funciona
  expect(spyAssign).toHaveBeenCalledWith("d1", "1");
  });
});

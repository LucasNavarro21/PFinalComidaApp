// src/use-cases/Order/UpdateOrderStatus.test.ts
import { describe, it, expect, beforeEach, vi } from "vitest";
import type { Order } from "../../entities/Order.js";
import type { OrderService } from "../../services/OrderService.js";
import { UpdateOrderStatus } from "./UpdateOrderStatus.js";
import { OrderStatus } from "../../entities/Order.js";

describe("UpdateOrderStatus Use Case", () => {
  let mockOrderService: Partial<OrderService>;
  let updateOrderStatus: UpdateOrderStatus;

  beforeEach(() => {
    mockOrderService = {
      findById: vi.fn(),
      updateStatus: vi.fn(),
    };
    updateOrderStatus = new UpdateOrderStatus(mockOrderService as OrderService);
  });

  it("debería actualizar el estado de una orden existente", async () => {
    const order: Order = {
      id: "1",
      userId: "u1",
      restaurantId: "r1",
      items: [],
      totalPrice: 100,
      status: OrderStatus.CREATED,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    (mockOrderService.findById as any).mockResolvedValue(order);
    (mockOrderService.updateStatus as any).mockImplementation(
      (id: string, status: Order["status"]) =>
        Promise.resolve({ ...order, status, updatedAt: new Date() })
    );

    const updated = await updateOrderStatus.execute({ orderId: "1", status: OrderStatus.DELIVERED });

    expect(updated.status).toBe(OrderStatus.DELIVERED);
    expect(mockOrderService.findById).toHaveBeenCalledWith("1");
    expect(mockOrderService.updateStatus).toHaveBeenCalledWith("1", OrderStatus.DELIVERED);
  });

  it("debería lanzar un error si la orden no existe", async () => {
    (mockOrderService.findById as any).mockResolvedValue(undefined);

    await expect(
      updateOrderStatus.execute({ orderId: "999", status: OrderStatus.DELIVERED })
    ).rejects.toThrow("Order with id 999 not found");
  });
});

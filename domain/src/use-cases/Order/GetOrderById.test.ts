import { describe, it, expect, beforeEach, vi } from "vitest";
import { GetOrderById } from "./GetOrderById";
import { OrderStatus, Order } from "../../entities/Order";
import { OrderService } from "../../services/OrderService";

describe("GetOrderById Use Case", () => {
  let mockOrderService: Partial<OrderService>;
  let getOrderById: GetOrderById;

  const mockOrder: Order = {
    id: "123",
    userId: "user1",
    restaurantId: "rest1",
    items: [],
    totalPrice: 25,
    status: OrderStatus.CREATED,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    mockOrderService = {
    findById: vi.fn(),
    findAll: vi.fn(),
    findByUserId: vi.fn(),
    findByRestaurantId: vi.fn(),
    updateStatus: vi.fn(),
    };

    getOrderById = new GetOrderById(mockOrderService as OrderService);
  });

  it("debería devolver la orden si existe", async () => {
    (mockOrderService.findById as any).mockResolvedValue(mockOrder);

    const result = await getOrderById.execute("123");

    expect(mockOrderService.findById).toHaveBeenCalledWith("123");
    expect(result).toEqual(mockOrder);
  });

  it("debería lanzar un error si la orden no existe", async () => {
    (mockOrderService.findById as any).mockResolvedValue(null);

    await expect(() => getOrderById.execute("999")).rejects.toThrow("Orden no encontrada");
  });
});

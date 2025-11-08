import type { OrderItem } from "../../types/order.types";
import  { mockOrderItems } from "../../mocks/orderSummary.mock";

export const OrderItemService = {
  async getAll(): Promise<OrderItem[]> {
    await new Promise((res) => setTimeout(res, 500));
    return mockOrderItems;
  },

  async getOrderById(orderId: string): Promise<OrderItem[]> {
    await new Promise((res) => setTimeout(res, 500));
    return mockOrderItems.filter((item) => item.orderId === orderId);
  },

  async create(item: OrderItem & { orderId: string }): Promise<OrderItem> {
    await new Promise((res) => setTimeout(res, 300));
    mockOrderItems.push(item);
    return item;
  },

  async update(id: string, item: Partial<OrderItem>): Promise<OrderItem> {
    await new Promise((res) => setTimeout(res, 300));
    const index = mockOrderItems.findIndex((i) => i.id === id);
    if (index !== -1) {
      mockOrderItems[index] = { ...mockOrderItems[index], ...item };
      return mockOrderItems[index];
    }
    throw new Error("Ítem no encontrado");
  },

  async delete(id: string): Promise<void> {
    await new Promise((res) => setTimeout(res, 300));
    const index = mockOrderItems.findIndex((i) => i.id === id);
    if (index !== -1) mockOrderItems.splice(index, 1);
  },
};

import type { OrderItem } from "../../services/types/order.types";

export const mockOrderItems: OrderItem[] = [
  {
    id: "1",
    orderId: "101",
    productId: "p1",
    quantity: 2,
    unitPrice: 5.99,
    subtotal: 11.98,
    product: {
      id: "p1",
      name: "Hamburguesa",
      price: 5.99,
      image: "https://via.placeholder.com/80x80?text=Burger",
      description: "Deliciosa hamburguesa casera",
      category: "FAST_FOOD",
    },
  },
  {
    id: "2",
    orderId: "102",
    productId: "p2",
    quantity: 1,
    unitPrice: 10.99,
    subtotal: 10.99,
    product: {
      id: "p2",
      name: "Pizza",
      price: 10.99,
      image: "https://via.placeholder.com/80x80?text=Pizza",
      description: "Pizza con queso mozzarella y tomate",
      category: "ITALIAN",
    },
  },
];

export const OrderItemService = {
  async getAll(): Promise<OrderItem[]> {
    await new Promise((res) => setTimeout(res, 500));
    return mockOrderItems;
  },

  async getByOrderId(orderId: string): Promise<OrderItem[]> {
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

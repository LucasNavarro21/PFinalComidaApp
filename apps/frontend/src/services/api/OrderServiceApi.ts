import type { OrderItem } from "../../services/types/order.types";

const API_BASE_URL = "http://localhost:3000";

export const OrderItemService = {
  async getAll(): Promise<OrderItem[]> {
    const response = await fetch(`${API_BASE_URL}/order-items`);
    if (!response.ok) {
      throw new Error("Error al obtener los ítems de pedidos");
    }
    return response.json();
  },

  async getByOrderId(orderId: string): Promise<OrderItem[]> {
    const response = await fetch(`${API_BASE_URL}/order-items/${orderId}`);
    if (!response.ok) {
      throw new Error(`Error al obtener los ítems del pedido ${orderId}`);
    }
    return response.json();
  },

  async create(item: OrderItem & { orderId: string }): Promise<OrderItem> {
    const response = await fetch(`${API_BASE_URL}/order-items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      throw new Error("Error al crear el ítem de pedido");
    }

    return response.json();
  },

  async update(id: string, item: Partial<OrderItem>): Promise<OrderItem> {
    const response = await fetch(`${API_BASE_URL}/order-items/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar el ítem de pedido");
    }

    return response.json();
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/order-items/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Error al eliminar el ítem de pedido");
    }
  },
};


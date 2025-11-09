// src/services/api/OrderServiceApi.ts
import type { OrderItem } from "../../types/order.types";
import { fetchWithAuth } from "./fetchWithAuth";

const API_BASE_URL = "http://localhost:3000";

export const OrderItemService = {
  async getAll(token: string): Promise<OrderItem[]> {
    const response = await fetchWithAuth(`${API_BASE_URL}/order-items`, {}, token);

    if (!response.ok) {
      throw new Error("Error al obtener los ítems de pedido");
    }

    const data: OrderItem[] = await response.json();
    return data;
  },

  async getOrderById(orderId: string, token: string): Promise<OrderItem[]> {
    const response = await fetchWithAuth(`${API_BASE_URL}/order-items/${orderId}`, {}, token);

    if (!response.ok) {
      throw new Error(`Error al obtener los ítems del pedido ${orderId}`);
    }

    const data: OrderItem[] = await response.json();
    return data;
  },
};

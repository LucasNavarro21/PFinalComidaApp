import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { OrderItemService } from "../services/api/OrderServiceApi";
import type { OrderItem } from "../types/order.types";

export function useOrder(orderId: string) {
  const { token } = useAuthContext();
  const [items, setItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchItems() {
      if (!token) {
        setError("No autenticado");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const data = await OrderItemService.getOrderById(orderId, token);
        setItems(data);
      } catch (err) {
        setError("Error al cargar datos");
      } finally {
        setLoading(false);
      }
    }
    fetchItems();
  }, [orderId, token]);

  const total = items.reduce((sum, item) => sum + item.subtotal, 0);

  return { items, total, loading, error };
}

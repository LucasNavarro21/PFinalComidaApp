// src/hooks/useOrder.ts
import { useEffect, useState } from "react";
import type { OrderItem } from "../types/order.types";
// import { OrderItemService } from "../services/api/OrderServiceApi";
import { OrderItemService } from "../services/mock/OrderServiceMock";

export function useOrder(orderId?: string) { 
  const [items, setItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchItems() {
      try {
        setLoading(true);
        const data = orderId
          ? await OrderItemService.getOrderById(orderId) 
          : await OrderItemService.getAll(); 

        setItems(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load order items");
      } finally {
        setLoading(false);
      }
    }

    fetchItems();
  }, [orderId]);

  const total = items.reduce((sum, item) => sum + item.subtotal, 0);

  return { items, total, loading, error };
}

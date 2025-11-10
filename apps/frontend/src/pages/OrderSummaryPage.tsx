// src/pages/OrderSummaryPage.tsx
import { useEffect, useState } from "react";
import { OrderSummary } from "../components/OrderSummary/OrderSummary";
import type { OrderItem } from "../types/order.types";
import { OrderItemService } from "../services/api/OrderServiceApi";
import { useAuthContext } from "../context/AuthContext";

export default function OrderSummaryPage() {
  const { token } = useAuthContext(); 
  const [items, setItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        if (!token) {
          setError("No se encontró token de autenticación.");
          return;
        }

        const data = await OrderItemService.getAll(token);
        setItems(data);
      } catch (err) {
        console.error(err);
        setError("Error al cargar los ítems del pedido.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderItems();
  }, [token]);

  const total = items.reduce((acc, item) => acc + item.subtotal, 0);

  return (
    <OrderSummary
      items={items}
      total={total}
      loading={loading}
      error={error}
    />
  );
}

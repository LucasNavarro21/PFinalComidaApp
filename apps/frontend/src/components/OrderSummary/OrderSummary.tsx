import { useEffect, useState } from "react";
import type { OrderItem } from "../../types/order.types";

// import { OrderItemService } from "../../services/mock/OrderServiceMock";
import { OrderItemService } from "../../services/api/OrderServiceApi";

import "./OrderSummary.css";

export function OrderSummary() {
  const [items, setItems] = useState<OrderItem[]>([]);

  useEffect(() => {
    (async () => {
      const data = await OrderItemService.getAll();
      setItems(data);
    })();
  }, []);

  const total = items.reduce(
    (sum, item) => sum + item.quantity * (item.product.price ?? 0),
    0
  );

  return (
    <div className="order-summary">
      <h2>Resumen del Pedido</h2>
      {items.length === 0 ? (
        <p>No hay productos en el pedido.</p>
      ) : (
        <>
          <ul>
            {items.map((item) => (
              <li key={item.product.id}>
                {item.product.name} — {item.quantity} × $
                {item.product.price.toFixed(2)}
              </li>
            ))}
          </ul>
          <h3>Total: ${total.toFixed(2)}</h3>
        </>
      )}
    </div>
  );
}

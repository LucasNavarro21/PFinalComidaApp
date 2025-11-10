// OrderSummary.tsx
import "./OrderSummary.css";
import type { OrderItem } from "../../types/order.types";

interface OrderSummaryProps {
  items: OrderItem[];
  total: number;
  loading?: boolean;
  error?: string | null;
}

export function OrderSummary({ items, total, loading = false, error = null }: OrderSummaryProps) {
  if (loading) return <p>Cargando resumen del pedido...</p>;
  if (error) return <p className="order-error">{error}</p>;
  if (!items || items.length === 0) return <p>No hay productos en el pedido.</p>;

  return (
    <div className="order-summary">
      <h2 className="order-summary-title">Resumen del Pedido</h2>
      <div className="order-items">
        {items.map((item) => (
          <div key={item.id} className="order-item">
            <div className="order-item-info">
              <p className="order-item-name">{item.product.name}</p>
              <p className="order-item-qty">
                {item.quantity} × ${item.product.price.toFixed(2)}
              </p>
            </div>
            <p className="order-item-subtotal">${item.subtotal.toFixed(2)}</p>
          </div>
        ))}
      </div>
      <div className="order-total">
        <span>Total:</span>
        <strong>${total.toFixed(2)}</strong>
      </div>
    </div>
  );
}

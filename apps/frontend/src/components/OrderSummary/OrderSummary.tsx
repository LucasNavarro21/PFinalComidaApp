import type { CartItem } from "../../services/types/cart.types";
import "./OrderSummary.css";

export interface OrderSummaryProps {
  cartItems: CartItem[];
  onCheckout: () => void;
}

export function OrderSummary({ cartItems, onCheckout }: OrderSummaryProps) {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return <p>Tu carrito está vacío 🛒</p>;
  }

  return (
    <div className="order-summary">
      <h2>Resumen del pedido</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            <img src={item.image} alt={item.name} />
            <div>
              <strong>{item.name}</strong>
              <p>{item.quantity} x ${item.price}</p>
            </div>
          </li>
        ))}
      </ul>
      <h3>Total: ${total}</h3>
      <button onClick={onCheckout}>Ir al pago 💳</button>
    </div>
  );
}

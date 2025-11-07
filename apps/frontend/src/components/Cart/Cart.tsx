import "./cart.css";
import type { CartItem } from "../../services/types/cart.types";

type CartProps = {
  items: CartItem[];
  onRemove?: (id: number) => void;
};

export function Cart({ items, onRemove }: CartProps) {
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart">
      <h2>Tu carrito</h2>
      {items.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <ul className="cart-list">
          {items.map((item) => (
            <li key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-item-info">
                <h4>{item.name}</h4>
                <p>
                  {item.quantity} x ${item.price}
                </p>
              </div>
              {onRemove && (
                <button
                  className="cart-remove-btn"
                  onClick={() => onRemove(item.id)}
                >
                  Eliminar
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
      <h3 className="cart-total">Total: ${total}</h3>
    </div>
  );
}

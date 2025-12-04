import "./Cart.css";
import type { CartItem } from "../../types/cart.types";

type CartProps = {
  items: CartItem[];
  onRemove?: (id: string) => void;
  onUpdateQuantity?: (id: string, quantity: number) => void;
};

export function Cart({ items, onRemove, onUpdateQuantity }: CartProps) {
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart">
      <div className="cart-content">
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
                  <p>${item.price}</p>
                </div>

                <div className="cart-item-controls">
                  {onUpdateQuantity && (
                    <div className="quantity-adjuster">
                      <button
                        className="qty-btn-small"
                        onClick={() =>
                          onUpdateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        −
                      </button>
                      <span className="qty-display-small">{item.quantity}</span>
                      <button
                        className="qty-btn-small"
                        onClick={() =>
                          onUpdateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  )}

                  <span className="item-subtotal">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>

                  {onRemove && (
                    <button
                      className="cart-remove-btn"
                      onClick={() => onRemove(item.id)}
                      title="Eliminar producto"
                    >
                      🗑️
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}

        <h3 className="cart-total">Total: ${total.toFixed(2)}</h3>
      </div>
    </div>
  );
}

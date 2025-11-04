import { useState } from "react";
import type { Product } from "../../services/types/product.types";
import "./Cart.css";

interface CartItem extends Product {
  quantity: number;
}

interface CartProps {
  initialItems?: CartItem[];
}

export function Cart({ initialItems = [] }: CartProps) {
  const [items, setItems] = useState<CartItem[]>(initialItems);

  const handleQuantityChange = (id: number, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart">
      <h2>🛒 Carrito</h2>
      {items.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div>
                <h4>{item.name}</h4>
                <p>${item.price} x {item.quantity}</p>
                <div className="cart-controls">
                  <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                  <button onClick={() => handleQuantityChange(item.id, +1)}>+</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <h3>Total: ${total.toFixed(2)}</h3>
      <button disabled={items.length === 0}>Confirmar Pedido</button>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Cart } from "../components/Cart/Cart";
import { CartService } from "../services/api/CartServiceApi";
import { useAuthContext } from "../context/AuthContext";
import type { CartItem } from "../types/cart.types";

export default function CartPage() {
  const { token } = useAuthContext();
  const [items, setItems] = useState<CartItem[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (!token) throw new Error("No token found");
        const data = await CartService.getCart(token);
        setItems(data);
      } catch (err) {
        setError("Error al cargar el carrito");
      }
    };

    fetchCart();
  }, [token]);

  const handleRemove = async (id: string) => {
    try {
      if (!token) throw new Error("No token found");
      await CartService.removeItem(id, token);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError("Error al eliminar el producto");
    }
  };

  if (error) return <p>{error}</p>;

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "80px" }}>
      <Cart items={items} onRemove={handleRemove} />
    </div>
  );
}

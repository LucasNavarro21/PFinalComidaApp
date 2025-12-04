import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { OrderSummary } from "../components/OrderSummary/OrderSummary";
import type { OrderItem } from "../types/order.types";
import type { CartItem } from "../types/cart.types";
import { OrderItemService } from "../services/api/OrderServiceApi";
import { useAuthContext } from "../context/AuthContext";
import "./OrderSummaryPage.css";
import "./OrderSummaryPage.css";

export default function OrderSummaryPage() {
  const { token } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [items, setItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const cartItems: CartItem[] = location.state?.cartItems || [];

    if (cartItems.length === 0) {
      setError("No hay productos en el pedido. Por favor, selecciona productos primero.");
      return;
    }

    const orderItems: OrderItem[] = cartItems.map((item) => ({
      id: item.id,
      orderId: "", 
      productId: item.id,
      quantity: item.quantity,
      unitPrice: item.price,
      subtotal: item.price * item.quantity,
      product: {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
      },
    }));

    setItems(orderItems);
  }, [location.state]);

  const total = items.reduce((acc, item) => acc + item.subtotal, 0);

  const handleConfirmOrder = async () => {
    try {
      setIsSubmitting(true);
      if (!token) {
        setError("No se encontró token de autenticación.");
        return;
      }

      alert("¡Pedido confirmado! El restaurante estará preparando tu orden.");
      navigate("/home");
    } catch (err) {
      setError("Error al confirmar el pedido. Por favor, intenta nuevamente.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (error && items.length === 0) {
    return (
      <div className="order-summary-page">
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => navigate("/home")} className="btn-back">
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="order-summary-page">
      <h1>Confirmación de Pedido</h1>
      <OrderSummary
        items={items}
        total={total}
        loading={loading}
        error={error}
      />

      {items.length > 0 && (
        <div className="order-actions">
          <button
            className="btn-confirm"
            onClick={handleConfirmOrder}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Confirmando..." : "Confirmar Pedido"}
          </button>
          <button className="btn-cancel" onClick={handleCancel}>
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
}

import React from "react";
import { OrderSummary } from "../components/OrderSummary/OrderSummary";
import type { CartItem } from "../types/cart.types";

export default function OrderSummaryPage() {
  const mockCart: CartItem[] = [
    { id: 1, name: "Pizza Margherita", price: 1200, quantity: 2 },
    { id: 2, name: "Hamburguesa", price: 900, quantity: 1 },
  ];

  const total = mockCart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleBack = () => alert("Volver al carrito 🛒");
  const handleConfirm = () => alert("Pedido confirmado ✅");

  return (
<OrderSummary
  cartItems={mockCart} 
  onCheckout={() => console.log("Checkout confirmado")} 
/>

  );
}

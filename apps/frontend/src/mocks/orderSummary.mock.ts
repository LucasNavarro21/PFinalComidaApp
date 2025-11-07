import type { OrderItem } from "../types/order.types";

export const mockOrderItems: OrderItem[] = [
  {
    id: "1",
    orderId: "1",
    productId: "1",
    quantity: 2,
    unitPrice: 2500,
    subtotal: 5000,
    product: {
      id: "1",
      name: "Pizza Muzzarella",
      price: 2500,
    },
  },
  {
    id: "2",
    orderId: "1",
    productId: "2",
    quantity: 6,
    unitPrice: 800,
    subtotal: 4800,
    product: {
      id: "2",
      name: "Empanadas",
      price: 800,
    },
  },
  {
    id: "3",
    orderId: "1",
    productId: "3",
    quantity: 3,
    unitPrice: 700,
    subtotal: 2100,
    product: {
      id: "3",
      name: "Coca-Cola 500ml",
      price: 700,
    },
  },
];

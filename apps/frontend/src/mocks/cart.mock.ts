import type { CartItem } from "../types/cart.types";

export const mockCartItems: CartItem[] = [
  {
    id: 1,
    name: "Pizza Muzzarella",
    price: 2500,
    quantity: 2,
    image: "https://via.placeholder.com/80x80?text=Pizza",
  },
  {
    id: 2,
    name: "Hamburguesa Doble",
    price: 3100,
    quantity: 1,
    image: "https://via.placeholder.com/80x80?text=Burger",
  },
  {
    id: 3,
    name: "Coca-Cola 500ml",
    price: 700,
    quantity: 3,
    image: "https://via.placeholder.com/80x80?text=Coke",
  },
];

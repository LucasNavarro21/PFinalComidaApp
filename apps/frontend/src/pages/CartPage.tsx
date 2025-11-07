import { useState } from "react";
import { Cart } from "../components/Cart/Cart";
import type { Product } from "../types/product.types";

export default function CartPage() {
  const [items, setItems] = useState<(Product & { quantity: number })[]>([
    {
      id: 1,
      name: "Pizza Margherita",
      description: "Pizza con salsa de tomate y mozzarella",
      price: 1200,
      image: "https://images.unsplash.com/photo-1601924582971-c8d2c0df7de7",
      restaurantId: 1,
      category: "Pizza",
      quantity: 2,
    },
    {
      id: 2,
      name: "Hamburguesa Clásica",
      description: "Carne, lechuga, tomate y queso",
      price: 900,
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
      restaurantId: 2,
      category: "Burgers",
      quantity: 1,
    },
  ]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "80px",
      }}
    >
      <Cart initialItems={items} />
    </div>
  );
}

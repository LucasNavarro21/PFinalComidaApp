// src/mocks/products.mock.ts
import type { Product } from "../types/product.types";

export const mockProducts: Product[] = [
  {
    id: 1,
    restaurantId: 1,
    name: "Cheeseburger",
    description: "Jugosa hamburguesa con queso cheddar y papas fritas.",
    price: 2500,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
    category: "Hamburguesas",
  },
  {
    id: 2,
    restaurantId: 1,
    name: "Doble Bacon Burger",
    description: "Doble carne, doble queso y bacon crujiente.",
    price: 3200,
    image: "https://images.unsplash.com/photo-1606755962773-d324e0a130b6",
    category: "Hamburguesas",
  },
  {
    id: 3,
    restaurantId: 2,
    name: "Pizza Margarita",
    description: "Mozzarella, tomate y albahaca fresca.",
    price: 2800,
    image: "https://images.unsplash.com/photo-1601924582971-c9e8aa1d220a",
    category: "Pizzas",
  },
];

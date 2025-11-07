import type { Restaurant } from "../services/types/restaurant.types";

export const mockRestaurants: Restaurant[] = [
  {
    id: 1,
    name: "BurgerLand",
    description: "Hamburguesas artesanales con papas caseras.",
    image: "https://via.placeholder.com/150/0000FF/FFFFFF?text=BurgerLand",
    category: "Hamburguesas",
    rating: 4.5,
    deliveryTime: "25-35 min",
    isOpen: true,
    address: "Av. Mitre 1234",
  },
  {
    id: 2,
    name: "Pizza Loca",
    description: "Pizzas clásicas al horno de barro.",
    image: "https://via.placeholder.com/150/FF0000/FFFFFF?text=Pizza+Loca",
    category: "Pizzas",
    rating: 4.2,
    deliveryTime: "30-40 min",
    isOpen: true,
    address: "Calle San Martín 567",
  },
  {
    id: 3,
    name: "Empanadas Express",
    description: "Empanadas de carne, pollo o jamón y queso.",
    image: "https://via.placeholder.com/150/008000/FFFFFF?text=Empanadas",
    category: "Empanadas",
    rating: 4.7,
    deliveryTime: "15-25 min",
    isOpen: false,
    address: "Av. Rivadavia 890",
  },
];

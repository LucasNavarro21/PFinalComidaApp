import type { Restaurant } from "./types/restaurant.types";
import type { Product } from "./types/product.types";

const mockRestaurants: Restaurant[] = [
  {
    id: 101,
    name: "Pizzería Don Luigi",
    category: "Pizza",
    address: "Av. Siempre Viva 742",
    image: "https://via.placeholder.com/300x200",
    rating: 4.7,
    deliveryTime: "30-40 min",
    isOpen: true,
  },
  {
    id: 102,
    name: "Burger House",
    category: "Hamburguesas",
    address: "Calle Falsa 123",
    image: "https://via.placeholder.com/300x200",
    rating: 4.5,
    deliveryTime: "25-35 min",
    isOpen: false,
  },
];

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Pizza Muzzarella",
    description: "Clásica pizza con muzzarella y orégano.",
    price: 2500,
    image: "https://via.placeholder.com/150",
    restaurantId: 101,
    category: "Pizza",
  },
  {
    id: 2,
    name: "Pizza Napolitana",
    description: "Muzzarella, tomate y ajo.",
    price: 2800,
    image: "https://via.placeholder.com/150",
    restaurantId: 101,
    category: "Pizza",
  },
  {
    id: 3,
    name: "Hamburguesa Clásica",
    description: "Carne, queso y pan de papa.",
    price: 3100,
    image: "https://via.placeholder.com/150",
    restaurantId: 102,
    category: "Hamburguesa",
  },
  {
    id: 4,
    name: "Hamburguesa Doble",
    description: "Doble carne y cheddar fundido.",
    price: 3600,
    image: "https://via.placeholder.com/150",
    restaurantId: 102,
    category: "Hamburguesa",
  },
];

export async function getRestaurants(): Promise<Restaurant[]> {
  await new Promise((res) => setTimeout(res, 500));
  return mockRestaurants;
}

export async function getProductsByRestaurant(restaurantId: number): Promise<Product[]> {
  await new Promise((res) => setTimeout(res, 500));
  return mockProducts.filter((p) => p.restaurantId === restaurantId);
}

export const RestaurantService = {
  getRestaurants,
  getProductsByRestaurant,
};

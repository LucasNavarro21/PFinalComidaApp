export type RestaurantCategory = "Hamburguer" | "Italian" | "Asian" | "Vegan" | "Empanadas" | "Pizzas";

import { Order } from "./order.types"
import { Product } from "./product.types"

export type Restaurant = {
  id: string;
  name: string;
  address: string;
  phone: string;
  category: RestaurantCategory;
  rating: number;
  ownerId?: string;
  products?: Product[];
  description?: string;
  deliveryTime?: string;
  isOpen?: boolean;
  orders?: Order[];
  image?:string,
  createdAt: string;
  updatedAt: string;
};

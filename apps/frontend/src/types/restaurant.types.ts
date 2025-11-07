export type RestaurantCategory = "FAST_FOOD" | "ITALIAN" | "ASIAN" | "VEGAN" | "OTHER";

export type Product = {
  id: string;
  name: string;
  price: number;
  description?: string;
  status: "AVAILABLE" | "UNAVAILABLE";
  restaurantId: string;
  createdAt: string;
  updatedAt: string;
};

export type Order = {
  id: string;
  total: number;
  createdAt: string;
};

export type Restaurant = {
  id: string;
  name: string;
  address: string;
  phone: string;
  category: RestaurantCategory;
  rating: number;
  products?: Product[];
  orders?: Order[];
  image?:string,
  createdAt: string;
  updatedAt: string;
};

import type { Restaurant } from "../../services/types/restaurant.types";

const mockRestaurants: Restaurant[] = [
  {
    id: "1",
    name: "Burger Place",
    address: "Av. Siempre Viva 123",
    phone: "1234-5678",
    category: "FAST_FOOD",
    rating: 4.3,
    products: [
      {
        id: "p1",
        name: "Hamburguesa Clasica",
        price: 5.99,
        status: "AVAILABLE",
        restaurantId: "1",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        description: "Hamburguesa con queso y tomate",
      },
    ],
    orders: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Pizza World",
    address: "Calle Falsa 456",
    phone: "9876-5432",
    category: "ITALIAN",
    rating: 4.7,
    products: [],
    orders: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const RestaurantService = {
  async findAll(): Promise<Restaurant[]> {
    await new Promise((res) => setTimeout(res, 500));
    return mockRestaurants;
  },

  async findById(id: string): Promise<Restaurant | null> {
    await new Promise((res) => setTimeout(res, 300));
    return mockRestaurants.find((r) => r.id === id) ?? null;
  },

  async findByCategory(category: string): Promise<Restaurant[]> {
    await new Promise((res) => setTimeout(res, 500));
    return mockRestaurants.filter((r) => r.category === category);
  },

};

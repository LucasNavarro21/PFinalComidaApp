    export interface Restaurant {
  id: number;
  name: string;
  image: string;
  category: string;   // Ej: “Pizzería”, “Sushi”, “Hamburguesas”
  rating: number;     // Promedio de estrellas (1 a 5)
  deliveryTime: string; // Ej: “30-40 min”
  isOpen: boolean;
  address: string
}

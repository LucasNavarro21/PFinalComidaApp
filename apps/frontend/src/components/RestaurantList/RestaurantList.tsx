import { useEffect, useState } from "react";
import { RestaurantCard } from "./RestaurantCard";
import { getRestaurants } from "../../services/RestaurantService";
import type { Restaurant } from "../../services/types/restaurant.types";
import "./RestaurantCard.css";

export function RestaurantList() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    async function loadRestaurants() {
      const data = await getRestaurants();
      setRestaurants(data);
    }
    loadRestaurants();
  }, []);

  const handleSelect = (id: number) => {
    console.log("Restaurante seleccionado:", id);
  };

  return (
    <div className="restaurant-list">
      {restaurants.map((r) => (
        <RestaurantCard key={r.id} restaurant={r} onSelect={handleSelect} />
      ))}
    </div>
  );
}

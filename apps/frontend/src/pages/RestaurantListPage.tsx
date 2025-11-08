import type { Restaurant } from "../types/restaurant.types";
import { RestaurantCard } from "../components/RestaurantCard/RestaurantCard";
import "./RestaurantList.css";

interface RestaurantListProps {
  restaurants: Restaurant[];
  onSelectRestaurant?: (restaurant: Restaurant) => void;
}

export function RestaurantList({ restaurants, onSelectRestaurant }: RestaurantListProps) {
  if (!restaurants || restaurants.length === 0) {
    return <p>No hay restaurantes disponibles.</p>;
  }

  return (
    <div className="restaurant-list">
      {restaurants.map((restaurant) => (
        <div
          key={restaurant.id}
          onClick={() => onSelectRestaurant?.(restaurant)}
          style={{ cursor: "pointer" }}
        >
          <RestaurantCard restaurant={restaurant} />
        </div>
      ))}
    </div>
  );
}

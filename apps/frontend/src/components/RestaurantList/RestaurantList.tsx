import "./RestaurantList.css";
import { Restaurant } from "../../types/restaurant.types";
import { RestaurantCard } from "../RestaurantCard/RestaurantCard";

interface RestaurantListProps {
  restaurants: Restaurant[];
  onSelectRestaurant?: (restaurant: Restaurant) => void;
}

export function RestaurantList({ restaurants, onSelectRestaurant }: RestaurantListProps) {
  if (!restaurants || restaurants.length === 0) {
    return <p>No restaurants found.</p>;
  }

  return (
    <div className="restaurant-list">
      {restaurants.map((restaurant) => (
        <div
          key={restaurant.id}
          onClick={() => onSelectRestaurant?.(restaurant)}
          style={{ cursor: onSelectRestaurant ? "pointer" : "default" }}
        >
          <RestaurantCard restaurant={restaurant} />
        </div>
      ))}
    </div>
  );
}

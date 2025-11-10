// src/components/RestaurantList/RestaurantList.tsx
import "./RestaurantList.css";
import { Restaurant } from "../../types/restaurant.types";
import { RestaurantCard } from "../RestaurantCard/RestaurantCard";

interface RestaurantListProps {
  restaurants: Restaurant[];
}

export function RestaurantList({ restaurants }: RestaurantListProps) {
  if (!restaurants || restaurants.length === 0) {
    return <p>No restaurants found.</p>;
  }

  return (
    <div className="restaurant-list">
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
}

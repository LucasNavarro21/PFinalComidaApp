// src/components/RestaurantList/RestaurantCard.tsx
import "./RestaurantCard.css";
import { Restaurant } from "../../types/restaurant.types";

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <div className="restaurant-card">
      <img src={restaurant.image} alt={restaurant.name} />
      <div className="restaurant-info">
        <h3>{restaurant.name}</h3>
        <p className="restaurant-category">{restaurant.category}</p>
      </div>
    </div>
  );
}

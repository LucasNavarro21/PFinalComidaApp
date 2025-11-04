import "./RestaurantCard.css";
import type { Restaurant } from "../../services/types/restaurant.types";

interface RestaurantCardProps {
  restaurant: Restaurant;
  onSelect?: (id: number) => void;
}

export function RestaurantCard({ restaurant, onSelect }: RestaurantCardProps) {
  return (
    <div
      className={`restaurant-card ${!restaurant.isOpen ? "closed" : ""}`}
      onClick={() => onSelect?.(restaurant.id)}
    >
      <img src={restaurant.image} alt={restaurant.name} className="restaurant-image" />
      <div className="restaurant-info">
        <h3>{restaurant.name}</h3>
        <p>{restaurant.category}</p>
        <p> {restaurant.rating} — {restaurant.deliveryTime}</p>
        {!restaurant.isOpen && <span className="closed-label">Cerrado</span>}
      </div>
    </div>
  );
}

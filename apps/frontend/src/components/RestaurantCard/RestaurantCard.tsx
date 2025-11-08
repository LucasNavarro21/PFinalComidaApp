// src/components/RestaurantList/RestaurantCard.tsx
import "./RestaurantCard.css";
import { useRestaurants } from "../../hooks/useRestaurant";

export function RestaurantCard() {
  const { restaurants, loading, error } = useRestaurants();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (restaurants.length === 0) return <p>No restaurants found.</p>;

  const restaurant = restaurants[0];

  return (
    <div className="restaurant-card">
      <img src={restaurant.image} alt={restaurant.name} />
      <h3>{restaurant.name}</h3>
      <p>{restaurant.category}</p>
    </div>
  );
}

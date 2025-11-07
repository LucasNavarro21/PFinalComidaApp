import "./RestaurantList.css";
import { useRestaurants } from "../../hooks/useRestaurant";

export function RestaurantList() {
  const { restaurants, loading, error } = useRestaurants();

  if (loading) return <p>Loading restaurants...</p>;
  if (error) return <p>{error}</p>;
  if (restaurants.length === 0) return <p>No restaurants found.</p>;

  return (
    <div className="restaurant-list">
      {restaurants.map((r) => (
        <div key={r.id} className="restaurant-card">
          <img src={r.image} alt={r.name} />
          <h3>{r.name}</h3>
          <p>{r.category}</p>
        </div>
      ))}
    </div>
  );
}

import { useEffect, useState } from "react";
import type { Restaurant } from "../../types/restaurant.types";
// import { RestaurantService } from "../../services/api/RestaurantServiceApi"; 
import { RestaurantService } from "../../services/mock/RestaurantServiceMock"; 


import "./RestaurantCard.css";

export function RestaurantCard() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    (async () => {
      const data = await RestaurantService.findAll();
      setRestaurants(data);
    })();
  }, []);

  if (restaurants.length === 0) {
    return <p>No hay restaurantes disponibles.</p>;
  }

  return (
    <div className="restaurant-card-container">
      {restaurants.map((r) => (
        <div key={r.id} className="restaurant-card">
          <h3>{r.name}</h3>
          <p>{r.address}</p>
          <p>Categoría: {r.category}</p>
          <p>Teléfono: {r.phone}</p>
          <p>⭐ {r.rating.toFixed(1)}</p>
        </div>
      ))}
    </div>
  );
}

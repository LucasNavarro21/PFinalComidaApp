import React, { useEffect, useState } from "react";
import type { Restaurant } from "../../services/types/restaurant.types";
import { RestaurantService } from "../../services/api/RestaurantServiceApi"; 
// import { RestaurantService } from "../../services/mock/RestaurantServiceMock"; 

import "./RestaurantList.css";

export const RestaurantList: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await RestaurantService.findAll();
        setRestaurants(data);
      } catch {
        setError("Error al cargar restaurantes");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p>Cargando restaurantes...</p>;
  if (error) return <p>{error}</p>;
  if (restaurants.length === 0) return <p>No hay restaurantes disponibles.</p>;

  return (
    <div className="restaurant-list">
      <h2>Restaurantes</h2>
      <ul>
        {restaurants.map((r) => (
          <li key={r.id}>
            <h3>{r.name}</h3>
            <p>{r.address}</p>
            <p>Teléfono: {r.phone}</p>
            <p>Categoría: {r.category}</p>
            <p>Rating: {r.rating.toFixed(1)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

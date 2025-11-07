import { useState, useEffect } from "react";
import { RestaurantList } from "../components/RestaurantList/RestaurantList";
import { getRestaurants } from "../services/mock/RestaurantServiceMock";
import type { Restaurant } from "../types/restaurant.types";

export default function RestaurantPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRestaurants() {
      const data = await getRestaurants();
      setRestaurants(data);
      setLoading(false);
    }
    loadRestaurants();
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center", marginTop: "80px" }}>Cargando restaurantes...</p>;
  }

  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ textAlign: "center" }}>Restaurantes disponibles</h2>
      <RestaurantList />
    </div>
  );
}

import { useEffect, useState } from "react";
import { RestaurantList } from "../components/RestaurantList/RestaurantList";
import { Restaurant } from "../types/restaurant.types";
import { RestaurantService } from "../services/api/RestaurantServiceApi";
import { useAuthContext } from "../context/AuthContext";

export default function RestaurantPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { token } = useAuthContext(); 

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!token) {
        setError("No hay token de autenticación.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await RestaurantService.findAll(token);
        setRestaurants(data);
      } catch (err) {
        console.error(err);
        setError("Error al cargar los restaurantes.");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [token]); 

  if (loading) return <p>Cargando restaurantes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="restaurant-page">
      <h1>Restaurantes</h1>
      <RestaurantList restaurants={restaurants} />
    </div>
  );
}

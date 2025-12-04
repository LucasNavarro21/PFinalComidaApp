import { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import type { Restaurant } from "../types/restaurant.types";
import { RestaurantService } from "../services/api/RestaurantServiceApi";
import { RestaurantList } from "../components/RestaurantList/RestaurantList";
import "./CustomerHome.css";

export function CustomerHome() {
  const { token } = useAuthContext();
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        if (!token) return;
        const data = await RestaurantService.findAll(token);
        setRestaurants(data);
      } catch (err) {
        setError("Error al cargar restaurantes");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [token]);

  if (loading) return <div className="customer-home"><p>Cargando...</p></div>;
  if (error) return <div className="customer-home"><p className="error">{error}</p></div>;

  return (
    <div className="customer-home">
      <h1>Restaurantes Disponibles</h1>
      {restaurants.length === 0 ? (
        <p>No hay restaurantes disponibles.</p>
      ) : (
        <RestaurantList
          restaurants={restaurants}
          onSelectRestaurant={(r) => navigate(`/restaurants/${r.id}/menu`)}
        />
      )}
    </div>
  );
}

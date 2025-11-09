// src/hooks/useRestaurants.ts
import { useEffect, useState } from "react";
import type { Restaurant } from "../types/restaurant.types";
import { RestaurantService } from "../services/api/RestaurantServiceApi";
import { useAuthContext } from "../context/AuthContext";

export function useRestaurants() {
  const { token } = useAuthContext();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    setLoading(true);

    RestaurantService.findAll(token)
      .then((data) => {
        setRestaurants(data);
        setError(null);
      })
      .catch(() => setError("Error loading restaurants"))
      .finally(() => setLoading(false));
  }, [token]);

  return { restaurants, loading, error };
}

// src/hooks/useRestaurants.ts
import { useEffect, useState } from "react";
import type { Restaurant } from "../types/restaurant.types";

import { RestaurantService } from "../services/api/RestaurantServiceApi";
// import { RestaurantService } from "../services/mock/RestaurantServiceMock";

export function useRestaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    RestaurantService.findAll()
      .then((data) => {
        setRestaurants(data);
        setError(null);
      })
      .catch(() => setError("Error loading restaurants"))
      .finally(() => setLoading(false));
  }, []);

  return { restaurants, loading, error };
}

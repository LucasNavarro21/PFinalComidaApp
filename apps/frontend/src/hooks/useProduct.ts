import { useEffect, useState } from "react";
import type { Product } from "../types/product.types";

import { ProductService } from "../services/api/ProductServiceApi";
// import { ProductService } from "../services/mock/ProductServiceMock";

export function useProducts(restaurantId: number) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!restaurantId) return;

    setLoading(true);
    ProductService.getProductsByRestaurant(restaurantId)
      .then((data) => {
        setProducts(data);
        setError(null);
      })
      .catch(() => setError("Error loading products"))
      .finally(() => setLoading(false));
  }, [restaurantId]);

  return { products, loading, error };
}

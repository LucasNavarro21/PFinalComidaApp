import { useEffect, useState } from "react";
import type { Product } from "../types/product.types";
import { ProductService } from "../services/api/ProductServiceApi";
import { useAuthContext } from "../context/AuthContext";

export function useProducts() {
  const { token } = useAuthContext();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return; 
    setLoading(true);

    ProductService.findAll(token)
      .then((data) => {
        setProducts(data);
        setError(null);
      })
      .catch(() => setError("Error loading products"))
      .finally(() => setLoading(false));
  }, [token]);

  return { products, loading, error };
}

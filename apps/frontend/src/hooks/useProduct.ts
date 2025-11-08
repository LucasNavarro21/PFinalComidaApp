import { useEffect, useState } from "react";
import type { Product } from "../types/product.types";
// import { ProductService } from "../services/mock/ProductServiceMock";
import { ProductService } from "../services/api/ProductServiceApi";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    ProductService.findAll()
      .then((data) => {
        setProducts(data);
        setError(null);
      })
      .catch(() => setError("Error loading products"))
      .finally(() => setLoading(false));
  }, []);

  return { products, loading, error };
}

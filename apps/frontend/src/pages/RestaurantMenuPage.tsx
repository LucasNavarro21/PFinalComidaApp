import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductList } from "../components/ProductList/ProductList";
import { Product } from "../types/product.types";
import { ProductService } from "../services/api/ProductServiceApi";
import { useAuthContext } from "../context/AuthContext";

export default function RestaurantMenuPage() {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const { token } = useAuthContext(); 
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!restaurantId || !token) return;

      try {
        setLoading(true);
        const data = await ProductService.getProductsByRestaurant(
          Number(restaurantId),
          token
        );
        setProducts(data);
      } catch (err) {
        setError("Error al cargar los productos.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [restaurantId, token]);

  if (loading) return <p>Cargando menú...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="restaurant-menu-page">
      <h2>Menú del restaurante</h2>
      <ProductList products={products} />
    </div>
  );
}

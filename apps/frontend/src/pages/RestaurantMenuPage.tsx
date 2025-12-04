import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductList } from "../components/ProductList/ProductList";
import { Cart } from "../components/Cart/Cart";
import { Product } from "../types/product.types";
import { CartItem } from "../types/cart.types";
import { ProductService } from "../services/api/ProductServiceApi";
import { useAuthContext } from "../context/AuthContext";
import "./RestaurantMenuPage.css";

export default function RestaurantMenuPage() {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const { token } = useAuthContext();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!restaurantId || !token) return;

      try {
        setLoading(true);
        const data = await ProductService.getProductsByRestaurant(
          restaurantId,
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

  const handleAddToCart = (product: Product, quantity: number) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image || "",
          quantity,
        },
      ];
    });
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    navigate("/order-summary", { state: { cartItems } });
  };

  if (loading) return <p>Cargando menú...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="restaurant-menu-page">
      <h2>Menú del restaurante</h2>
      <div className="menu-container">
        <div className="products-section">
          <ProductList products={products} onAddToCart={handleAddToCart} />
        </div>
        <div className="cart-section">
          <Cart
            items={cartItems}
            onRemove={handleRemoveFromCart}
            onUpdateQuantity={handleUpdateQuantity}
          />
          {cartItems.length > 0 && (
            <div className="cart-actions">
              <button className="btn-checkout" onClick={handleCheckout}>
                Realizar Pedido (${getCartTotal().toFixed(2)})
              </button>
              <button
                className="btn-continue"
                onClick={() => setCartItems([])}
              >
                Limpiar Carrito
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

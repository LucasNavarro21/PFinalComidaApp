import { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { ProductForm } from "../components/ProductForm/ProductForm";
import { RestaurantService } from "../services/api/RestaurantServiceApi";
import { ProductService } from "../services/api/ProductServiceApi";
import type { Restaurant } from "../types/restaurant.types";
import type { Product } from "../types/product.types";
import "./OwnerDashboard.css";

export function OwnerDashboard() {
  const { token, user } = useAuthContext();
  const [myRestaurant, setMyRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [activeTab, setActiveTab] = useState<"info" | "products">("info");

  useEffect(() => {
    if (token && user) {
      loadMyRestaurant();
    }
  }, [token, user]);

  const loadMyRestaurant = async () => {
    try {
      setLoading(true);
      if (!token) return;

      const restaurants = await RestaurantService.findAll(token);
      const owned = restaurants.find((r) => r.ownerId === user?.id);

      if (owned) {
        setMyRestaurant(owned);
      } else {
        showMessage("error", "No tienes un restaurante asignado.");
      }
    } catch (err) {
      showMessage("error", "Error al cargar tu restaurante");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleCreateProduct = async (data: Partial<Product>) => {
    try {
      if (!token || !myRestaurant) return;

      const productPayload = {
        name: data.name!,
        description: data.description!,
        price: data.price!,
        restaurantId: myRestaurant.id,
        category: data.category,
        image: data.image,
      };

      await ProductService.create(productPayload, token);
      showMessage("success", "Producto creado exitosamente");
      loadMyRestaurant();
    } catch (err) {
      showMessage("error", err instanceof Error ? err.message : "Error al crear producto");
      console.error(err);
    }
  };

  if (loading) {
    return <div className="owner-dashboard"><p>Cargando...</p></div>;
  }

  if (!myRestaurant) {
    return (
      <div className="owner-dashboard">
        <div className="no-restaurant">
          <h2>No tienes un restaurante asignado</h2>
          <p>Contacta con un administrador para que te asigne un restaurante.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="owner-dashboard">
      <div className="dashboard-header">
        <h1>Panel del Propietario</h1>
        {message && (
          <div className={`message message-${message.type}`}>
            {message.text}
          </div>
        )}
      </div>

      <div className="restaurant-card-main">
        <div className="restaurant-header">
          <h2>{myRestaurant.name}</h2>
          <span className="category">{myRestaurant.category}</span>
        </div>
        <p className="address"> {myRestaurant.address}</p>
        <p className="phone"> {myRestaurant.phone}</p>
        <p className="rating"> Rating: {myRestaurant.rating}</p>
      </div>

      <div className="tabs">
        <button
          className={`tab ${activeTab === "info" ? "active" : ""}`}
          onClick={() => setActiveTab("info")}
        >
          Información
        </button>
        <button
          className={`tab ${activeTab === "products" ? "active" : ""}`}
          onClick={() => setActiveTab("products")}
        >
          Productos
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "info" && (
          <div className="info-section">
            <h3>Detalles del Restaurante</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Nombre</label>
                <p>{myRestaurant.name}</p>
              </div>
              <div className="info-item">
                <label>Dirección</label>
                <p>{myRestaurant.address}</p>
              </div>
              <div className="info-item">
                <label>Teléfono</label>
                <p>{myRestaurant.phone}</p>
              </div>
              <div className="info-item">
                <label>Categoría</label>
                <p>{myRestaurant.category}</p>
              </div>
              <div className="info-item">
                <label>Rating</label>
                <p>{myRestaurant.rating} ⭐</p>
              </div>
              <div className="info-item">
                <label>Productos</label>
                <p>{myRestaurant.products?.length || 0} productos</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "products" && (
          <div className="products-section">
            <div className="section-half">
              <ProductForm
                onSubmit={handleCreateProduct}
                mode="create"
                isLoading={loading}
              />
            </div>
            <div className="section-half">
              <h3>Mis Productos</h3>
              {myRestaurant.products && myRestaurant.products.length > 0 ? (
                <div className="products-list">
                  {myRestaurant.products.map((product) => (
                    <div key={product.id} className="product-item">
                      <div className="product-info">
                        <h4>{product.name}</h4>
                        <p className="description">{product.description}</p>
                        <span className="price">${product.price}</span>
                      </div>
                      <div className="product-actions">
                        <button className="btn-edit"> Editar</button>
                        <button className="btn-delete">🗑️ Eliminar</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-products">No tienes productos aún. ¡Crea tu primer producto!</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

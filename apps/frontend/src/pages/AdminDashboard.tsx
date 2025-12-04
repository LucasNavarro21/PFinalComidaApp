import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { CreateRestaurantForm } from "../components/CreateRestaurantForm/CreateRestaurantForm";
import { ProductForm } from "../components/ProductForm/ProductForm";
import { RestaurantService } from "../services/api/RestaurantServiceApi";
import { ProductService } from "../services/api/ProductServiceApi";
import type { Restaurant } from "../types/restaurant.types";
import type { Product } from "../types/product.types";
import "./AdminDashboard.css";

export function AdminDashboard() {
  const navigate = useNavigate();
  const { token, user } = useAuthContext();
  const [activeTab, setActiveTab] = useState<"restaurants" | "products">("restaurants");
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (token && user) {
      loadRestaurants();
    }
  }, [token, user]);

  const loadRestaurants = async () => {
    try {
      setLoading(true);
      if (!token || !user) return;
      const data = await RestaurantService.findAll(token);
      const ownedRestaurants = data.filter(r => r.ownerId === user.id);
      setRestaurants(ownedRestaurants);
    } catch (err) {
      showMessage("error", "Error al cargar restaurantes");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleCreateRestaurant = async (data: { name: string; address: string }) => {
    try {
      if (!token) return;
      await RestaurantService.create(data, token);
      showMessage("success", "Restaurante creado exitosamente");
      loadRestaurants();
    } catch (err) {
      showMessage("error", "Error al crear restaurante");
      console.error(err);
    }
  };

  const handleCreateProduct = async (data: Partial<Product>) => {
    try {
      if (!token || !selectedRestaurant) return;

      const productPayload = {
        name: data.name!,
        description: data.description!,
        price: data.price!,
        restaurantId: selectedRestaurant.id,
        category: data.category,
        image: data.image,
      };

      await ProductService.create(productPayload, token);
      showMessage("success", "Producto creado exitosamente");
      loadRestaurants();
    } catch (err) {
      showMessage("error", err instanceof Error ? err.message : "Error al crear producto");
      console.error(err);
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Panel de Administrador</h1>
        {message && (
          <div className={`message message-${message.type}`}>
            {message.text}
          </div>
        )}
      </div>

      <div className="tabs">
        <button
          className={`tab ${activeTab === "restaurants" ? "active" : ""}`}
          onClick={() => setActiveTab("restaurants")}
        >
          Gestionar Restaurantes
        </button>
        <button
          className={`tab ${activeTab === "products" ? "active" : ""}`}
          onClick={() => setActiveTab("products")}
        >
          Gestionar Productos
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "restaurants" && (
          <div className="restaurants-section">
            <div className="section-half">
              <CreateRestaurantForm onSubmit={handleCreateRestaurant} />
            </div>
            <div className="section-half">
              <h3>Restaurantes Registrados</h3>
              {loading ? (
                <p>Cargando...</p>
              ) : restaurants.length === 0 ? (
                <p>No hay restaurantes registrados aún.</p>
              ) : (
                <div className="restaurants-list">
                  {restaurants.map((restaurant) => (
                    <div
                      key={restaurant.id}
                      className={`restaurant-item ${selectedRestaurant?.id === restaurant.id ? "selected" : ""}`}
                    >
                      <div onClick={() => setSelectedRestaurant(restaurant)}>
                        <h4>{restaurant.name}</h4>
                        <p>{restaurant.address}</p>
                        <span className="category">{restaurant.category}</span>
                      </div>
                      <button
                        className="btn-view-menu"
                        onClick={() => navigate(`/restaurants/${restaurant.id}/menu`)}
                        title="Ver menú y productos"
                      >
                        Ver Menú
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "products" && (
          <div className="products-section">
            {!selectedRestaurant ? (
              <div className="select-restaurant-prompt">
                <p>Selecciona un restaurante primero en la pestaña de restaurantes.</p>
              </div>
            ) : (
              <div className="section-half">
                <ProductForm
                  onSubmit={handleCreateProduct}
                  mode="create"
                  isLoading={loading}
                />
                <div className="restaurant-info">
                  <h4>Restaurante Seleccionado: {selectedRestaurant.name}</h4>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

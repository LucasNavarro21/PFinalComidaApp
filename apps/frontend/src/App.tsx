import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import OrderSummaryPage from "./pages/OrderSummaryPage";
import { AuthProvider } from "./context/AuthContext";
import { Navbar } from "./components/Navbar/Navbar";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import { AdminDashboard } from "./pages/AdminDashboard";
import { OwnerDashboard } from "./pages/OwnerDashboard";
import { CustomerHome } from "./pages/CustomerHome";
import RestaurantMenuPage from "./pages/RestaurantMenuPage";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/home"
            element={
              <ProtectedRoute allowedRoles={["CUSTOMER"]}>
                <CustomerHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute allowedRoles={["CUSTOMER"]}>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order-summary"
            element={
              <ProtectedRoute allowedRoles={["CUSTOMER"]}>
                <OrderSummaryPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/owner/dashboard"
            element={
                <ProtectedRoute allowedRoles={["RESTAURANT_OWNER"]}>
                <OwnerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/unauthorized"
            element={
              <div style={{ padding: "2rem", textAlign: "center" }}>
                <h1>Acceso Denegado</h1>
                <p>No tienes permisos para acceder a esta página.</p>
              </div>
            }
          />

          <Route
            path="/restaurants/:restaurantId/menu"
            element={
              <ProtectedRoute allowedRoles={["CUSTOMER", "RESTAURANT_OWNER", "ADMIN"]}>
                <RestaurantMenuPage />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
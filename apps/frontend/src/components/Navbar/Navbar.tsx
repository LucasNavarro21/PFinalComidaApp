import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import "./Navbar.css";

export const Navbar = () => {
  const { user, logout } = useAuthContext();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        {user?.role === "CUSTOMER" && (
          <>
            <Link to="/home" className="nav-link">Inicio</Link>
            <Link to="/cart" className="nav-link">🛒 Carrito</Link>
          </>
        )}

        {user?.role === "ADMIN" && (
          <Link to="/admin/dashboard" className="nav-link nav-highlight">Panel Administrativo</Link>
        )}

        {user?.role === "RESTAURANT_OWNER" && (
          <Link to="/owner/dashboard" className="nav-link nav-highlight">Mi Restaurante</Link>
        )}
      </div>

      <div className="navbar-center">
        {user && (
          <span className="user-info">
            {user.name} <small className="role-badge">{user.role}</small>
          </span>
        )}
      </div>

      <div className="navbar-right">
        {!user ? (
          <>
            <Link to="/login" className="nav-button">Login</Link>
            <Link to="/register" className="nav-button nav-button-primary">Sign Up</Link>
          </>
        ) : (
          <button className="nav-button nav-button-danger" onClick={logout}>
            Salir
          </button>
        )}
      </div>
    </nav>
  );
};

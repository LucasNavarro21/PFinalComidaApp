import { Link } from "react-router-dom";
import "./UnauthorizedPage.css";

export function UnauthorizedPage() {
  return (
    <div className="unauthorized-page">
      <div className="unauthorized-content">
        <h1>🔒 Acceso Denegado</h1>
        <p>No tienes permisos para acceder a esta página.</p>
        <Link to="/login" className="btn-back">
          Volver al Login
        </Link>
      </div>
    </div>
  );
}

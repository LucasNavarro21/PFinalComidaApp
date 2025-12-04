import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

export const LoginForm = () => {
  const { login, user } = useAuthContext();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      const result = await login(email, password);
      setSuccess("Inicio de sesión exitoso. ¡Bienvenido!");

      const role = result?.user?.role;

      if (role === "ADMIN") {
        navigate("/admin/dashboard");
      } else if (role === "RESTAURANT_OWNER") {
        navigate("/owner/dashboard");
      } else {
        navigate("/home");
      }

      setEmail("");
      setPassword("");
    } catch (err) {
      setError("Error al iniciar sesión. Verifica tus credenciales.");
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Iniciar Sesión</h2>

      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Entrar</button>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </form>
  );
};

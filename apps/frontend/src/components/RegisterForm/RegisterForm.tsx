import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import "./RegisterForm.css";
import { useNavigate } from "react-router-dom";

export const RegisterForm = () => {
  const { register } = useAuthContext();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [role, setRole] = useState("CUSTOMER"); 

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !email || !password) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    try {
      await register(name, email, password, role);  
      setSuccess("Registro exitoso. ¡Bienvenido!");

      navigate("/login");
      setName("");
      setEmail("");
      setPassword("");
      setRole("CUSTOMER");
    } catch (err) {
      setError("Error al registrar el usuario.");
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h2>Registro</h2>

      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

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

      
      <select  className = "dropdown-rol" value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="CUSTOMER">Cliente</option>
        <option value="ADMIN">Dueño</option>
      </select>

      <button type="submit">Registrarse</button>

      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
    </form>
  );
};

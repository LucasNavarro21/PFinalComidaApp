  // src/components/RegisterForm/RegisterForm.tsx
  import { useState } from "react";
  import { useAuthContext } from "../../context/AuthContext";
  import "./RegisterForm.css";

  export const RegisterForm = () => {
    const { register } = useAuthContext();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
        await register(name, email, password);
        setSuccess("Registro exitoso. ¡Bienvenido!");
        setName("");
        setEmail("");
        setPassword("");
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

        <button type="submit">Registrarse</button>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </form>
    );
  };

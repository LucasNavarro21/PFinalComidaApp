import React, { useState } from "react";
import "./RegisterForm.css";
import type { RegisterData } from "../../services/types/auth.types";

// interface RegisterFormProps {
//   onRegister: (data: { name: string; email: string; password: string; role: string }) => void;
// }

interface RegisterFormProps {
  onRegister?: (data: RegisterData) => Promise<void>;
}

export function RegisterForm({ onRegister }: RegisterFormProps) {
  const [formData, setFormData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
    role: "CUSTOMER",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (onRegister) {
        await onRegister(formData);
      } else {
        console.log("Registro:", formData);
      }
    } catch (err: any) {
      setError(err.message || "Ocurrió un error durante el registro");
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Registro</h2>

      <input
        type="text"
        name="name"
        placeholder="Nombre"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <select name="role" value={formData.role} onChange={handleChange}>
        <option value="CUSTOMER">Cliente</option>
        <option value="RESTAURANT_OWNER">Dueño de Restaurante</option>
        <option value="ADMIN">Administrador</option>
      </select>

      <button type="submit">Registrarse</button>

      {error && <p className="error">{error}</p>}
    </form>
  );
}
// src/components/restaurant/CreateRestaurantForm.tsx
import { useState } from "react";
import "./CreateRestaurantForm.css";

interface CreateRestaurantFormProps {
  onSubmit: (data: { name: string; address: string; phone: string }) => void;
}

export const CreateRestaurantForm = ({ onSubmit }: CreateRestaurantFormProps) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, address, phone });
  };

  return (
    <form className="restaurant-form" onSubmit={handleSubmit}>
      <h2>Crear Restaurante</h2>

      <label>
        Nombre:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>

      <label>
        Dirección:
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </label>

      <label>
        Teléfono:
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </label>

      <button type="submit">Crear</button>
    </form>
  );
};

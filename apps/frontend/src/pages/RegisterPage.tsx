import { useState } from "react";
import { RegisterForm } from "../components/RegisterForm/RegisterForm";
import { registerUser } from "../services/AuthService";
import type { RegisterData } from "../services/types/auth.types";

export default function RegisterPage() {
  const [message, setMessage] = useState("");

  const handleRegister = async (data: RegisterData) => {
    const response = await registerUser(data);

    if (response.success) {
      setMessage(`✅ ${response.message} — Bienvenido, ${response.user?.name}`);
    } else {
      setMessage(`${response.message}`);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "80px",
      }}
    >
      <RegisterForm onRegister={handleRegister} />
      {message && <p>{message}</p>}
    </div>
  );
}

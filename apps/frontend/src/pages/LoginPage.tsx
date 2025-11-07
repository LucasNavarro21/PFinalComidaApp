import { useState } from "react";
import {LoginForm} from "../components/LoginForm/LoginForm";
import { loginUser } from "../services/mock/AuthServiceMock";

export default function LoginPage() {
  const [message, setMessage] = useState("");

  const handleLogin = async (username: string, password: string) => {
    const response = await loginUser(username, password);

    if (response.success) {
      setMessage(` ${response.message} — Rol: ${response.role}`);
      console.log("Token generado:", response.token);
    } else {
      setMessage(` ${response.message}`);
    }
    return response
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "80px" }}>
      <LoginForm onLogin={handleLogin} />
      {message && <p>{message}</p>}
    </div>
  );
}

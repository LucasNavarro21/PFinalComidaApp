import { useState } from "react";
import "./LoginForm.css";

interface LoginFormProps {
  onLogin?: (username: string, password: string) => Promise<{
    success: boolean;
    message: string;
  }>;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (onLogin) {
        const result = await onLogin(username, password);

        if (!result.success) {
          setError(result.message);
        } else {
          setError("");  
        }
      } else {
        console.log("Login:", username, password);
      }
    } catch {
      setError("Ocurrió un error inesperado");
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Inicio de sesión</h2>
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Ingresar</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}

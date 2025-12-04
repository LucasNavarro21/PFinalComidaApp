import { useState } from "react";
import { LoginForm } from "../components/LoginForm/LoginForm";

export default function LoginPage() {
  const [message, setMessage] = useState("");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "80px",
      }}
    >
      <LoginForm />
      {message && <p>{message}</p>}
    </div>
  );
}

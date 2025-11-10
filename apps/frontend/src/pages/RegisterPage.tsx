// src/pages/RegisterPage.tsx
import { useState } from "react";
import { RegisterForm } from "../components/RegisterForm/RegisterForm";

export default function RegisterPage() {
  const [message, setMessage] = useState("");

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <RegisterForm />
      {message && <p className="text-red-500 mt-4">{message}</p>}
    </div>
  );
}

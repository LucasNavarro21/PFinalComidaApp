// src/services/api/fetchWithAuth.ts
import { useAuthContext } from "../../context/AuthContext";

export async function fetchWithAuth(
  url: string,
  options: RequestInit = {},
  token?: string
): Promise<Response> {
  const headers = {
    ...(options.headers || {}),
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  };

  const opts = {
    ...options,
    headers,
  };

  return fetch(url, opts);
}

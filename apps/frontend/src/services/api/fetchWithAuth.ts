export async function fetchWithAuth(
  url: string,
  options: RequestInit = {},
  token?: string
): Promise<Response> {
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const isFormData = options.body instanceof FormData;
  if (!isFormData && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  const opts: RequestInit = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, opts);

    if (!response.ok) {
      console.error(`HTTP Error ${response.status}: ${response.statusText}`);
    }

    return response;
  } catch (error) {
    console.error("Network error in fetchWithAuth:", error);
    throw new Error("Network error while fetching data");
  }
}

import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useProducts } from "../hooks/useProduct";

// 👇 Mock del contexto de autenticación
vi.mock("../context/AuthContext", () => ({
  useAuthContext: () => ({ token: "fake-token" }), // simulamos que el usuario está logueado
}));

// 👇 Mock del servicio de productos
vi.mock("../services/api/ProductServiceApi", () => ({
  ProductService: {
    findAll: vi.fn(),
  },
}));

import { ProductService } from "../services/api/ProductServiceApi";

describe("useProducts", () => {
  it("should fetch products successfully", async () => {
    const mockProducts = [{ id: 1, name: "Pizza" }];
    (ProductService.findAll as ReturnType<typeof vi.fn>).mockResolvedValue(mockProducts);

    const { result } = renderHook(() => useProducts());

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.products).toEqual(mockProducts);
    expect(result.current.error).toBeNull();
  });

  it("should handle API error", async () => {
    (ProductService.findAll as ReturnType<typeof vi.fn>).mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useProducts());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("Error loading products");
    expect(result.current.products).toEqual([]);
  });
});

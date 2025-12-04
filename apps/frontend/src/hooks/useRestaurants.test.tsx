import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useRestaurants } from "../hooks/useRestaurant";

vi.mock("../context/AuthContext", () => ({
  useAuthContext: () => ({ token: "fake-token" }),
}));

vi.mock("../services/api/RestaurantServiceApi", () => ({
  RestaurantService: {
    findAll: vi.fn(),
  },
}));

import { RestaurantService } from "../services/api/RestaurantServiceApi";

describe("useRestaurants", () => {
  it("should fetch restaurants successfully", async () => {
    const mockRestaurants = [{ id: 1, name: "Burger Place" }];
    (RestaurantService.findAll as ReturnType<typeof vi.fn>).mockResolvedValue(mockRestaurants);

    const { result } = renderHook(() => useRestaurants());

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.restaurants).toEqual(mockRestaurants);
    expect(result.current.error).toBeNull();
  });

  it("should handle API error", async () => {
    (RestaurantService.findAll as ReturnType<typeof vi.fn>).mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useRestaurants());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("Error loading restaurants");
    expect(result.current.restaurants).toEqual([]);
  });
});

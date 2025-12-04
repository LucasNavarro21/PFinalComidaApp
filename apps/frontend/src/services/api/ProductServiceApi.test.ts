import { describe, it, expect, vi, beforeEach } from "vitest";
import { ProductService } from "../../services/api/ProductServiceApi";
import { fetchWithAuth } from "../../services/api/fetchWithAuth";

vi.mock("../../services/api/fetchWithAuth");

describe("ProductServiceApi", () => {
  const mockToken = "fake-token";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch all products successfully", async () => {
    const mockProducts = [{ id: 1, name: "Burger" }];

    (fetchWithAuth as any).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockProducts),
    });

    const result = await ProductService.findAll(mockToken);

    expect(fetchWithAuth).toHaveBeenCalledWith(
      "http://localhost:3000/products",
      {},
      mockToken
    );
    expect(result).toEqual(mockProducts);
  });

  it("should throw error when fetching all products fails", async () => {
    (fetchWithAuth as any).mockResolvedValueOnce({ ok: false });

    await expect(ProductService.findAll(mockToken)).rejects.toThrow(
      "Failed to fetch products"
    );
  });

  it("should fetch products by restaurant successfully", async () => {
    const mockProducts = [{ id: 2, name: "Pizza", restaurantId: 10 }];

    (fetchWithAuth as any).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockProducts),
    });

    const result = await ProductService.getProductsByRestaurant("10", mockToken);

    expect(fetchWithAuth).toHaveBeenCalledWith(
      "http://localhost:3000/products?restaurantId=10",
      {},
      mockToken
    );
    expect(result).toEqual(mockProducts);
  });

  it("should throw error when fetching products by restaurant fails", async () => {
    (fetchWithAuth as any).mockResolvedValueOnce({ ok: false });

    await expect(
      ProductService.getProductsByRestaurant("10", mockToken)
    ).rejects.toThrow("Failed to fetch products by restaurant");
  });
});

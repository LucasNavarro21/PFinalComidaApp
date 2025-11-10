import { describe, it, expect, vi, beforeEach } from "vitest";
import { AuthService } from "./AuthServiceApi";

const mockFetch = vi.fn();

global.fetch = mockFetch as any;

describe("AuthServiceApi", () => {
  const API_BASE_URL = "http://localhost:3000";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should login successfully", async () => {
    const mockResponse = {
      token: "fake-token",
      user: { id: 1, name: "Lucas", email: "lucas@test.com" },
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await AuthService.login("lucas@test.com", "123456");

    expect(mockFetch).toHaveBeenCalledWith(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "lucas@test.com", password: "123456" }),
    });
    expect(result).toEqual(mockResponse);
  });

  it("should throw error on failed login", async () => {
    mockFetch.mockResolvedValueOnce({ ok: false });

    await expect(
      AuthService.login("lucas@test.com", "wrongpassword")
    ).rejects.toThrow("Login failed");
  });

  it("should register successfully", async () => {
    const mockResponse = {
      token: "new-token",
      user: { id: 2, name: "Lucas", email: "lucas@new.com" },
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await AuthService.register("Lucas", "lucas@new.com", "123456");

    expect(mockFetch).toHaveBeenCalledWith(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Lucas", email: "lucas@new.com", password: "123456" }),
    });
    expect(result).toEqual(mockResponse);
  });

  it("should throw error on failed registration", async () => {
    mockFetch.mockResolvedValueOnce({ ok: false });

    await expect(
      AuthService.register("Lucas", "lucas@new.com", "123456")
    ).rejects.toThrow("Registration failed");
  });
});

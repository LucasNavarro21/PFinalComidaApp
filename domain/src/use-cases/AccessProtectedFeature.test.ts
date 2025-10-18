import { describe, it, expect } from "vitest";
import { AccessProtectedFeature } from "./AccessProtectedFeature.js";

describe("AccessProtectedFeature", () => {
  it("debería permitir acceso a un rol autorizado", () => {
    const access = new AccessProtectedFeature(["ADMIN", "RESTAURANT_OWNER"]);

    const result = access.execute({
    id: "1",
    name: "Lucas",
    email: "lucas@example.com",
    password: "123456",
    role: "RESTAURANT_OWNER",
    status: "ACTIVE",
    createdAt: new Date(),
    updatedAt: new Date(),
    });

    expect(result).toBe("Acceso permitido para rol RESTAURANT_OWNER");
  });

  it("debería denegar acceso a un rol no autorizado", () => {
    const access = new AccessProtectedFeature(["ADMIN", "RESTAURANT_OWNER"]);

    expect(() =>
      access.execute({
            id: "2",
            name: "Pepe",
            email: "pepe@example.com",
            password: "515613",
            role: "CUSTOMER",
            status: "ACTIVE",
            createdAt: new Date(),
            updatedAt: new Date(),
      })
    ).toThrow("Acceso denegado: rol no autorizado");
  });
});

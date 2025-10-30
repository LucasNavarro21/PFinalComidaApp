import { describe, it, expect } from "vitest";
import { AccessProtectedFeature } from "./AccessProtectedFeature.js";
import { UserRole } from "../entities/User.js";

describe("AccessProtectedFeature", () => {
  it("debería permitir acceso si el rol del usuario es igual o superior al requerido", async () => {
    const result = await AccessProtectedFeature.execute(
      UserRole.ADMIN,
      UserRole.CUSTOMER
    );
    expect(result).toBe(true);
  });

  it("debería permitir acceso si el rol del usuario es exactamente el requerido", async () => {
    const result = await AccessProtectedFeature.execute(
      UserRole.RESTAURANT_OWNER,
      UserRole.RESTAURANT_OWNER
    );
    expect(result).toBe(true);
  });

  it("debería denegar acceso si el rol del usuario es inferior al requerido", async () => {
    const result = await AccessProtectedFeature.execute(
      UserRole.CUSTOMER,
      UserRole.ADMIN
    );
    expect(result).toBe(false);
  });
});

import { describe, it, expect, beforeEach } from "vitest";
import { MockedUserService } from "../../services/mocks/mockUserService.js";
import { RegisterUser } from "./RegisterUser.js";
import { LoginUser } from "./LoginUser.js";

describe("LoginUser Use Case", () => {
  let userService: MockedUserService;
  let registerUser: RegisterUser;
  let loginUser: LoginUser;

  beforeEach(async () => {
    userService = new MockedUserService([]);
    registerUser = new RegisterUser(userService);
    loginUser = new LoginUser(userService);

    await registerUser.execute({
      name: "Lucas Customer",
      email: "customer@example.com",
      password: "123456",
      role: "CUSTOMER",
    });

    await registerUser.execute({
      name: "Sofía Owner",
      email: "owner@example.com",
      password: "654321",
      role: "RESTAURANT_OWNER",
    });
  });

  it("debería permitir login de un usuario con rol válido", async () => {
    const {user} = await loginUser.execute({
      email: "customer@example.com",
      password: "123456",
      requiredRole: "CUSTOMER",
    });

    expect(user.role).toBe("CUSTOMER");
  });

  it("debería lanzar error si el rol no coincide", async () => {
    await expect(
      loginUser.execute({
        email: "customer@example.com",
        password: "123456",
        requiredRole: "RESTAURANT_OWNER",
      })
    ).rejects.toThrow("No tienes permiso para acceder con este rol");
  });
});

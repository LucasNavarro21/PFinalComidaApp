import { describe, it, expect, beforeEach } from "vitest";
import { MockedUserService } from "../../services/mocks/mockUserService.js";
import { RegisterUser } from "./RegisterUser.js";
import { UserStatus } from "../../entities/User.js";

describe("RegisterUser Use Case", () => {
  let userService: MockedUserService;
  let registerUser: RegisterUser;

  beforeEach(() => {
    userService = new MockedUserService([]);
    registerUser = new RegisterUser(userService);
  });

  it("debería registrar un nuevo usuario correctamente", async () => {
    const user = await registerUser.execute({
      name: "Lucas Navarro",
      email: "lucas@example.com",
      password: "123456",
      role: "CUSTOMER",
    });

    expect(user.name).toBe("Lucas Navarro");
    expect(user.email).toBe("lucas@example.com");
    expect(user.status).toBe(UserStatus.ACTIVE);
  });

  it("no debería permitir registrar un usuario con email duplicado", async () => {
    await registerUser.execute({
      name: "Lucas Navarro",
      email: "lucas@example.com",
      password: "123456",
      role: "CUSTOMER",
    });

    await expect(
      registerUser.execute({
        name: "Otro Usuario",
        email: "lucas@example.com",
        password: "654321",
        role: "CUSTOMER",
      })
    ).rejects.toThrow("Email ya registrado");
  });
});

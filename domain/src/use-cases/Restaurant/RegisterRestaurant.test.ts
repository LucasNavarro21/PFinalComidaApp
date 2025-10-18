import { describe, it, expect, beforeEach } from "vitest";
import { MockedRestaurantService } from "../../services/mocks/mockRestaurantService.js";
import { RegisterRestaurant } from "./RegisterRestaurant.js";
import { RestaurantCategory } from "../../entities/Restaurant.js";

describe("RegisterRestaurant Use Case", () => {
  let restaurantService: MockedRestaurantService;
  let registerRestaurant: RegisterRestaurant;

  beforeEach(() => {
    restaurantService = new MockedRestaurantService([]);
    registerRestaurant = new RegisterRestaurant(restaurantService);
  });

  it("debería registrar un nuevo restaurante correctamente", async () => {
    const restaurant = await registerRestaurant.execute({
      name: "Pizzería Don Lucas",
      address: "Av. Siempreviva 742",
      category: RestaurantCategory.PIZZERIA,
      rating: 4.8,
      phone: "12125135"

    });

    expect(restaurant.name).toBe("Pizzería Don Lucas");
    expect(restaurant.id).toBeDefined();
  });

  it("no debería permitir duplicar nombres de restaurantes", async () => {
    await registerRestaurant.execute({
      name: "Pizzería Don Lucas",
      address: "Av. Siempreviva 742",
      category: RestaurantCategory.PIZZERIA,
      rating: 4.8,
      phone: "12125135"

    });

    await expect(
      registerRestaurant.execute({
        name: "Pizzería Don Lucas",
        address: "Otra dirección",
        category: RestaurantCategory.PIZZERIA,
        phone: "12125135",
        rating: 4.5,
      })
    ).rejects.toThrow("Ya existe un restaurante con ese nombre");
  });
});

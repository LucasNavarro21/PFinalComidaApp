import type { Meta, StoryObj } from "@storybook/react";
import { RestaurantCard } from "./RestaurantCard";

// import * as restaurantService from "../../services/api/RestaurantServiceApi";
import * as restaurantService from "../../services/mock/RestaurantServiceMock";

const meta: Meta<typeof RestaurantCard> = {
  title: "Components/RestaurantCard",
  component: RestaurantCard,
};
export default meta;

type Story = StoryObj<typeof RestaurantCard>;

export const Default: Story = {};

export const Empty: Story = {
  decorators: [
    (StoryFn) => {
      const originalFetch = globalThis.fetch;
      const originalFindAll = (restaurantService as any).RestaurantService.findAll;

      if (typeof fetch !== "undefined") {
        console.log("Interceptando fetch para /restaurants...");
        globalThis.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
          if (typeof input === "string" && input.includes("/restaurants")) {
            console.log("Respuesta vacía simulada (Empty mode)");
            return new Response(JSON.stringify([]), {
              status: 200,
              headers: { "Content-Type": "application/json" },
            });
          }
          return originalFetch(input, init);
        };
      } else {
        console.log("Usando mock vacío");
        (restaurantService as any).RestaurantService.findAll = async () => [];
      }

      const story = <StoryFn />;

      setTimeout(() => {
        globalThis.fetch = originalFetch;
        (restaurantService as any).RestaurantService.findAll = originalFindAll;
      }, 1500);

      return story;
    },
  ],
};

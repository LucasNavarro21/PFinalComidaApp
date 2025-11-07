import type { Meta, StoryObj } from "@storybook/react";
import { RestaurantList } from "./RestaurantList";

import * as ApiService from "../../services/api/RestaurantServiceApi";
import * as MockService from "../../services/mock/RestaurantServiceMock";

const ActiveService = (ApiService as any).RestaurantService;
// const ActiveService = (MockService as any).RestaurantService; 

const meta: Meta<typeof RestaurantList> = {
  title: "Components/RestaurantList",
  component: RestaurantList,
};
export default meta;

type Story = StoryObj<typeof RestaurantList>;

export const Default: Story = {};

// 🚫 Empty
export const Empty: Story = {
  decorators: [
    (StoryFn) => {
      const originalFetch = globalThis.fetch;
      const originalFindAll = ActiveService.findAll;

      if (ActiveService === ApiService.RestaurantService) {
        console.log("🔸 Interceptando fetch para /restaurants...");
        globalThis.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
          if (typeof input === "string" && input.includes("/restaurants")) {
            console.log("🔸 Respuesta vacía simulada (Empty mode)");
            return new Response(JSON.stringify([]), {
              status: 200,
              headers: { "Content-Type": "application/json" },
            });
          }
          return originalFetch(input, init);
        };
      } else {
        console.log("🔸 Usando mock vacío");
        ActiveService.findAll = async () => [];
      }

      const story = <StoryFn />;

      setTimeout(() => {
        if (ActiveService === ApiService.RestaurantService) {
          globalThis.fetch = originalFetch;
        } else {
          ActiveService.findAll = originalFindAll;
        }
      }, 1500);

      return story;
    },
  ],
};

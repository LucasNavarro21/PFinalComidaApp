import type { Meta, StoryObj } from "@storybook/react";
import { OrderSummary } from "./OrderSummary";

import * as ApiService from "../../services/api/OrderServiceApi";
// import * as MockService from "../../services/mock/OrderServiceMock";

const ActiveService = (ApiService as any).OrderItemService; 
// const ActiveService = (MockService as any).OrderItemService; // si querés mock

const meta: Meta<typeof OrderSummary> = {
  title: "Components/OrderSummary",
  component: OrderSummary,
};
export default meta;

type Story = StoryObj<typeof OrderSummary>;

export const Default: Story = {};

export const Empty: Story = {
  decorators: [
    (StoryFn) => {
      const originalFetch = globalThis.fetch;
      const originalGetAll = ActiveService.getAll;

      if (ActiveService === ApiService.OrderItemService) {
        console.log(" Interceptando fetch para /order-items...");
        globalThis.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
          if (typeof input === "string" && input.includes("/order-items")) {
            console.log("Respuesta vacía simulada (Empty mode)");
            return new Response(JSON.stringify([]), {
              status: 200,
              headers: { "Content-Type": "application/json" },
            });
          }
          return originalFetch(input, init);
        };
      } else {
        console.log("🔸 Usando mock vacío");
        ActiveService.getAll = async () => [];
      }

      const story = <StoryFn />;

      // Restauramos al desmontar
      setTimeout(() => {
        if (ActiveService === ApiService.OrderItemService) {
          globalThis.fetch = originalFetch;
        } else {
          ActiveService.getAll = originalGetAll;
        }
      }, 1500);

      return story;
    },
  ],
};

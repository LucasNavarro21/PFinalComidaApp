import type { Meta, StoryObj } from "@storybook/react";
import { ProductList } from "./ProductList";

import { ProductService } from "../../services/api/ProductServiceApi";
// import { ProductService } from "../../services/mock/ProductServiceMock";

const meta: Meta<typeof ProductList> = {
  title: "Components/ProductList",
  component: ProductList,
};
export default meta;

type Story = StoryObj<typeof ProductList>;

export const Default: Story = {
  args: { restaurantId: 1 },
};

export const Empty: Story = {
  args: { restaurantId: 1 },
  decorators: [
    (StoryFn) => {
      const originalFetch = globalThis.fetch;
      const originalFindAll = ProductService.getProductsByRestaurant;

      ProductService.getProductsByRestaurant = async () => [];

      const story = <StoryFn />;

      setTimeout(() => {
        ProductService.getProductsByRestaurant = originalFindAll;
        globalThis.fetch = originalFetch;
      }, 1500);

      return story;
    },
  ],
};

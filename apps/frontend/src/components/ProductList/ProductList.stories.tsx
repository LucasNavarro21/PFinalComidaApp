import type { Meta, StoryObj } from "@storybook/react";
import { ProductList } from "./ProductList";

// import { productService } from "../../services/mock/ProductServiceMock";
import { productService } from "../../services/api/ProductServiceApi";

const meta: Meta<typeof ProductList> = {
  title: "Components/ProductList",
  component: ProductList,
};
export default meta;

type Story = StoryObj<typeof ProductList>;

export const Default: Story = {};

export const Empty: Story = {
  decorators: [
    (StoryFn) => {
      const originalFindAll = productService.findAll;

      productService.findAll = async () => [];

      const story = <StoryFn />;

      setTimeout(() => {
        productService.findAll = originalFindAll;
      }, 1500);

      return story;
    },
  ],
};

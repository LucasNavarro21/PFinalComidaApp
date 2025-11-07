import type { Meta, StoryObj } from "@storybook/react";
import { ProductCard } from "./ProductCard";

// import { productService } from "../../services/mock/ProductServiceMock";
import { productService } from "../../services/api/ProductServiceApi";

const meta: Meta<typeof ProductCard> = {
  title: "Components/ProductCard",
  component: ProductCard,
};
export default meta;

type Story = StoryObj<typeof ProductCard>;

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

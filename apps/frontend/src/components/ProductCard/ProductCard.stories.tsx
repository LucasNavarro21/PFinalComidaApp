import type { Meta, StoryObj } from "@storybook/react";
import { ProductCard } from "./ProductCard";
import { mockProducts } from "../../mocks/product.mocks";

const meta: Meta<typeof ProductCard> = {
  title: "Components/ProductCard",
  component: ProductCard,
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

export const Default: Story = {
  render: () => <ProductCard product={mockProducts[0]} />,
};

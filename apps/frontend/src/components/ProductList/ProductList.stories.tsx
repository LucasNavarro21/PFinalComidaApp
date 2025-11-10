import type { Meta, StoryObj } from "@storybook/react";
import { ProductList } from "./ProductList";
import { mockProducts } from "../../mocks/product.mocks";

const meta: Meta<typeof ProductList> = {
  title: "Components/ProductList",
  component: ProductList,
};

export default meta;
type Story = StoryObj<typeof ProductList>;

export const Default: Story = {
  render: () => <ProductList products={mockProducts} />,
};

export const Empty: Story = {
  render: () => <ProductList products={[]} />,
};

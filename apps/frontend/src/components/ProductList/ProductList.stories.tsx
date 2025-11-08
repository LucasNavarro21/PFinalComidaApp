import type { Meta, StoryObj } from "@storybook/react";
import { ProductList } from "./ProductList";

const meta: Meta<typeof ProductList> = {
  title: "Components/ProductList",
  component: ProductList,
};

export default meta;
type Story = StoryObj<typeof ProductList>;

export const Default: Story = {};

export const Empty: Story = {
  render: () => (
    <div>
      <p>No products found.</p>
    </div>
  ),
};

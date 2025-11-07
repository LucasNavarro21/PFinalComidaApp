import type { Meta, StoryObj } from "@storybook/react";
import { Cart } from "./Cart";
import { mockCartItems } from "../../mocks/cart.mock";

const meta: Meta<typeof Cart> = {
  title: "Components/Cart",
  component: Cart,
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof Cart>;

export const Default: Story = {
  args: {
    items: mockCartItems,
  },
};

export const Empty: Story = {
  args: {
    items: [],
  },
};

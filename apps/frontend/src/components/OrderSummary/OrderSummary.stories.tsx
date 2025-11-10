// OrderSummary.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { OrderSummary } from "./OrderSummary";
import { mockOrderItems } from "../../mocks/orderSummary.mock";

const meta: Meta<typeof OrderSummary> = {
  title: "Components/OrderSummary",
  component: OrderSummary,
};

export default meta;
type Story = StoryObj<typeof OrderSummary>;

export const Default: Story = {
  args: {
    items: mockOrderItems,
    total: mockOrderItems.reduce((acc, item) => acc + item.subtotal, 0),
  },
};

export const Empty: Story = {
  args: {
    items: [],
    total: 0,
  },
};

export const Loading: Story = {
  args: {
    items: [],
    total: 0,
    loading: true,
  },
};

export const Error: Story = {
  args: {
    items: [],
    total: 0,
    error: "Error cargando el resumen del pedido.",
  },
};

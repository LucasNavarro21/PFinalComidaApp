import type { Meta, StoryObj } from "@storybook/react";
import { OrderSummary } from "./OrderSummary";

const meta: Meta<typeof OrderSummary> = {
  title: "Components/OrderSummary",
  component: OrderSummary,
};

export default meta;
type Story = StoryObj<typeof OrderSummary>;

export const Default: Story = {};

export const Empty: Story = {
  render: () => (
    <div>
      <p>No orders found.</p>
    </div>
  ),
};

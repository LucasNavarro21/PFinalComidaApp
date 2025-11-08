import type { Meta, StoryObj } from "@storybook/react";
import { RestaurantList } from "./RestaurantList";

const meta: Meta<typeof RestaurantList> = {
  title: "Components/RestaurantList",
  component: RestaurantList,
};

export default meta;
type Story = StoryObj<typeof RestaurantList>;

export const Default: Story = {};

export const Empty: Story = {
  render: () => (
    <div>
      <p>No restaurants found.</p>
    </div>
  ),
};

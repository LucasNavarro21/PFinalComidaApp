// src/components/RestaurantList/RestaurantCard.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { RestaurantCard } from "./RestaurantCard";

const meta: Meta<typeof RestaurantCard> = {
  title: "Components/RestaurantCard",
  component: RestaurantCard,
};

export default meta;
type Story = StoryObj<typeof RestaurantCard>;

export const Default: Story = {};

export const Empty: Story = {
  render: () => (
    <div>
      <p>No restaurants found.</p>
    </div>
  ),
};

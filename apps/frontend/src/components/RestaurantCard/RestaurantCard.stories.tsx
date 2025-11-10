// src/components/RestaurantList/RestaurantCard.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { RestaurantCard } from "./RestaurantCard";
import { mockRestaurants } from "../../mocks/restaurant.mock";

const meta: Meta<typeof RestaurantCard> = {
  title: "Components/RestaurantCard",
  component: RestaurantCard,
};

export default meta;
type Story = StoryObj<typeof RestaurantCard>;

export const Default: Story = {
  render: () => <RestaurantCard restaurant={mockRestaurants[0]} />,
};

export const Multiple: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem" }}>
      {mockRestaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/react";
import { RestaurantList } from "./RestaurantList";
import { mockRestaurants } from "../../mocks/restaurant.mock";

const meta: Meta<typeof RestaurantList> = {
  title: "Components/RestaurantList",
  component: RestaurantList,
};

export default meta;
type Story = StoryObj<typeof RestaurantList>;

export const Default: Story = {
  render: () => <RestaurantList restaurants={mockRestaurants} />,
};

export const Empty: Story = {
  render: () => <RestaurantList restaurants={[]} />,
};

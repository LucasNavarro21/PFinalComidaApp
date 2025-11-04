import type { Meta, StoryObj } from "@storybook/react";
import { RestaurantList } from "./RestaurantList";

const meta: Meta<typeof RestaurantList> = {
  title: "Components/RestaurantList",
  component: RestaurantList,
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof RestaurantList>;

export const Default: Story = {};

// src/components/RestaurantList/RestaurantList.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { RestaurantList } from "./RestaurantList";

// 👇 Configuración base del story
const meta: Meta<typeof RestaurantList> = {
  title: "Components/RestaurantList",
  component: RestaurantList,
};

export default meta;
type Story = StoryObj<typeof RestaurantList>;

// 📘 Muestra los restaurantes del mock (por defecto)
export const Default: Story = {};

// 📭 Estado vacío simulado manualmente
export const Empty: Story = {
  render: () => (
    <div>
      <p>No restaurants found.</p>
    </div>
  ),
};

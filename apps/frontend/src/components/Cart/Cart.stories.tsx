import type { Meta, StoryObj } from "@storybook/react";
import { Cart } from "./Cart";
import type { Product } from "../../services/types/product.types";

const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Pizza Margherita",
    description: "Pizza con salsa de tomate y mozzarella",
    price: 1200,
    image: "https://images.unsplash.com/photo-1601924582971-c8d2c0df7de7",
    restaurantId: 1,
    category: "Pizza",
  },
  {
    id: 2,
    name: "Hamburguesa Clásica",
    description: "Carne, lechuga, tomate y queso",
    price: 900,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349",
    restaurantId: 2,
    category: "Burgers",
  },
];

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
    initialItems: sampleProducts.map((p) => ({ ...p, quantity: 1 })),
  },
};

export const EmptyCart: Story = {
  args: {
    initialItems: [],
  },
};

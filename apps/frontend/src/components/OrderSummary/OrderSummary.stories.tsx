import type { Meta, StoryObj } from "@storybook/react";
import { OrderSummary } from "./OrderSummary";
import type { CartItem } from "../../services/types/cart.types";

const meta: Meta<typeof OrderSummary> = {
  title: "Components/OrderSummary",
  component: OrderSummary,
  parameters: {
    layout: "centered",
  },
};
export default meta;

type Story = StoryObj<typeof OrderSummary>;

const sampleCart: CartItem[] = [
  { id: 1, name: "Hamburguesa Doble", price: 2500, quantity: 1, image: "/img/burger.jpg" },
  { id: 2, name: "Papas Fritas", price: 1200, quantity: 2, image: "/img/fries.jpg" },
];

export const Default: Story = {
  args: {
    cartItems: sampleCart,
    onCheckout: () => alert("Pasando al pago 💳"),
  },
};

export const EmptyCart: Story = {
  args: {
    cartItems: [],
    onCheckout: () => alert("No hay nada en el carrito 😢"),
  },
};

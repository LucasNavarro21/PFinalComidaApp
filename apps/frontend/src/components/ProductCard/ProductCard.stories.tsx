import type { Meta, StoryObj } from "@storybook/react";
import { ProductCard } from "./ProductCard";
import type { Product } from "../../services/types/product.types";

const meta: Meta<typeof ProductCard> = {
  title: "Components/ProductCard",
  component: ProductCard,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

const sampleProduct: Product = {
  id: 1,
  name: "Pizza Muzzarella",
  description: "Clásica pizza con abundante muzzarella y salsa de tomate.",
  price: 2500,
  image: "https://via.placeholder.com/150",
  restaurantId: 101, 
  category: "Pizza", 
};

export const Default: Story = {
  args: {
    product: sampleProduct,
  },
};

export const Burger: Story = {
  args: {
    product: {
      id: 2,
      name: "Hamburguesa Doble",
      description: "Dos medallones de carne con queso cheddar y panceta.",
      price: 3100,
      image: "https://via.placeholder.com/150/0000FF/FFFFFF?text=Burger",
      restaurantId: 102,
      category: "Hamburguesas",
    },
  },
};

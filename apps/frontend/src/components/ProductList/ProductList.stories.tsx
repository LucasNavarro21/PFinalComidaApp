import type { Meta, StoryObj } from "@storybook/react";
import { ProductList } from "./ProductList";
import type { Product } from "../../services/types/product.types";

const meta: Meta<typeof ProductList> = {
  title: "Components/ProductList",
  component: ProductList,
  parameters: {
    layout: "centered",
  },
};
export default meta;

type Story = StoryObj<typeof ProductList>;

const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Pizza Muzzarella",
    description: "Clásica pizza con abundante muzzarella.",
    price: 2500,
    image: "https://via.placeholder.com/150",
    restaurantId: 101,
    category: "Pizza",
  },
  {
    id: 2,
    name: "Hamburguesa Doble",
    description: "Dos medallones de carne con cheddar.",
    price: 3100,
    image: "https://via.placeholder.com/150/0000FF/FFFFFF?text=Burger",
    restaurantId: 101,
    category: "Hamburguesas",
  },
  {
    id: 3,
    name: "Empanadas",
    description: "Carne, pollo o jamón y queso.",
    price: 900,
    image: "https://via.placeholder.com/150/FF0000/FFFFFF?text=Empanada",
    restaurantId: 101,
    category: "Empanadas",
  },
];

export const Default: Story = {
  args: {
    products: sampleProducts,
  },
};

export const Empty: Story = {
  args: {
    products: [],
  },
};

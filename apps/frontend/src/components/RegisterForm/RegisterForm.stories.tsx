import type { Meta, StoryObj } from "@storybook/react";
import { RegisterForm } from "./RegisterForm";

const meta: Meta<typeof RegisterForm> = {
  title: "Components/RegisterForm",
  component: RegisterForm,
  parameters: {
    layout: "centered",
  },
};
export default meta;

type Story = StoryObj<typeof RegisterForm>;

export const Default: Story = {
  args: {
    onRegister: async (data) => {
      alert(`Usuario registrado:\n${JSON.stringify(data, null, 2)}`);
    },
  },
};

export const EmailAlreadyExists: Story = {
  args: {
    onRegister: async () => {
      throw new Error("El email ya está registrado");
      // alert("El email ya esta registrado")
    },
  },
};

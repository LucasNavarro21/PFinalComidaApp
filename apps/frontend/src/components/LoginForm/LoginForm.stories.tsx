import type { Meta, StoryObj } from "@storybook/react";
import { LoginForm } from "../LoginForm/LoginForm";
import { loginUser } from "../../services/AuthService"; 

const meta: Meta<typeof LoginForm> = {
  title: "Components/LoginForm",
  component: LoginForm,
};
export default meta;

type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {
  args: {
    onLogin: async (username: string, password: string) => {
      const result = await loginUser(username, password);
      return result;
    },
  },
};

export const InvalidCredentials: Story = {
  args: {
    onLogin: async () => {
      return {
        success: false,
        message: "Usuario o contraseña incorrectos (mockeado desde Storybook)",
      };
    },
  },
};

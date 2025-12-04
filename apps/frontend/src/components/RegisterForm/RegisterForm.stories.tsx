import type { Meta, StoryObj } from "@storybook/react";
import { RegisterForm } from "./RegisterForm";
import { MockAuthProvider } from "../../mocks/mockAuthProvider";

const meta: Meta<typeof RegisterForm> = {
  title: "Components/RegisterForm",
  component: RegisterForm,
};
export default meta;

type Story = StoryObj<typeof RegisterForm>;

export const Default: Story = {
  render: () => (
    <MockAuthProvider register={async (name, email, password, role) => ({
      token: "mock-token",
      user: { id: "1", name, email, role: role as "ADMIN" | "CUSTOMER" | "RESTAURANT_OWNER" },
    })}>
      <RegisterForm />
    </MockAuthProvider>
  ),
};

export const RegisterError: Story = {
  render: () => (
    <MockAuthProvider
      register={async () => {
        throw new Error("Register failed");
      }}
    >
      <RegisterForm />
    </MockAuthProvider>
  ),
};

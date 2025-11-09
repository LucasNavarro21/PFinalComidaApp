// src/components/LoginForm/LoginForm.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { LoginForm } from "./LoginForm";
import { MockAuthProvider } from "../../mocks/mockAuthProvider";

const meta: Meta<typeof LoginForm> = {
  title: "Components/LoginForm",
  component: LoginForm,
};
export default meta;

type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {
  render: () => (
    <MockAuthProvider>
      <LoginForm />
    </MockAuthProvider>
  ),
};

export const LoginError: Story = {
  render: () => (
    <MockAuthProvider login={async () => Promise.reject(new Error("Invalid credentials"))}>
      <LoginForm />
    </MockAuthProvider>
  ),
};

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
    <MockAuthProvider register={async () => Promise.resolve()}>
      <RegisterForm />
    </MockAuthProvider>
  ),
};

export const RegisterError: Story = {
  render: () => (
    <MockAuthProvider
      register={async () => Promise.reject(new Error("Register failed"))}
    >
      <RegisterForm />
    </MockAuthProvider>
  ),
};

import type { Meta, StoryObj } from "@storybook/react";
import { LoginForm } from "./LoginForm";

// import { AuthService } from "../../services/api/AuthServiceApi";
import { AuthService } from "../../services/mock/AuthServiceMock";

const meta: Meta<typeof LoginForm> = {
  title: "Components/LoginForm",
  component: LoginForm,
};
export default meta;

type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {};


export const Empty: Story = {
  decorators: [
    (StoryFn) => {
      const originalLogin = AuthService.login;

      AuthService.login = async () => null;

      const story = <StoryFn />;


      setTimeout(() => {
        AuthService.login = originalLogin;
      }, 1500);

      return story;
    },
  ],
};

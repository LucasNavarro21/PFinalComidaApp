import type { Meta, StoryObj } from "@storybook/react";
import { RegisterForm } from "./RegisterForm";

import * as MockService from "../../services/mock/AuthServiceMock";
// import * as ApiService from "../../services/api/AuthServiceApi";

const ActiveService = (MockService as any).AuthService;
// const ActiveService = (ApiService as any).AuthService; // si querés API

const meta: Meta<typeof RegisterForm> = {
  title: "Components/RegisterForm",
  component: RegisterForm,
};
export default meta;

type Story = StoryObj<typeof RegisterForm>;

export const Default: Story = {};

export const Empty: Story = {
  decorators: [
    (StoryFn) => {
      const originalRegister = ActiveService.register;

      ActiveService.register = async () => {
        console.log("Simulando error en registro (Empty mode)");
        throw new Error("Error simulado en registro");
      };

      const story = <StoryFn />;

      setTimeout(() => {
        ActiveService.register = originalRegister;
      }, 1500);

      return story;
    },
  ],
};

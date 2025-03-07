import type { Meta, StoryObj } from "@storybook/react";
import { AllIcons } from "./AllIcons";

const meta: Meta<{}> = {
  title: "Design/Icons",
  component: AllIcons,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AllIconsRow: Story = {
  args: {},
};

export const AllIconsWithColor: Story = {
  args: {
    containerClassName: "ink:text-button-primary",
  },
};

export const AllIconsWithDifferentSize: Story = {
  args: {
    iconClassName: "ink:size-2",
  },
};

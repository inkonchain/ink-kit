import type { Meta, StoryObj } from "@storybook/react";
import { Card, type CardProps } from "./index";
import { Pill } from "../Pill";

const meta: Meta<CardProps> = {
  title: "Components (WIP)/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {},
  args: {
    title: "Card Example",
    description:
      "Ever wondered why keyboards aren't arranged in alphabetical order? Probably because someone in the 1870s had a really good time watching people hunt and peck for letters. QWERTY layout: the original practical joke that became a global standard.",
    image: (props) => (
      <img
        src="https://picsum.photos/1024/576"
        alt="Card Image"
        className={props.className}
        width={1024}
        height={580}
      />
    ),
    imageLocation: "left",
    mainLabels: <Pill>Main Label</Pill>,
    secondaryLabels: <Pill>Secondary Label</Pill>,
    variant: "light",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};

export const Dark: Story = {
  args: {
    variant: "dark",
  },
};

export const ImageOnTheRight: Story = {
  args: {
    imageLocation: "right",
  },
};

export const ImageOnTheTop: Story = {
  args: {
    imageLocation: "top",
  },
};

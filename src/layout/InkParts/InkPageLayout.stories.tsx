import type { Meta, StoryObj } from "@storybook/react";
import { InkPageLayout, InkPageLayoutProps } from "./InkPageLayout";
import { InkLayout } from "../InkLayout";
import { ExampleDynamicContent } from "../ForStories/ExampleDynamicContent";

/**
 * This component provides a column layout for a page.
 * The `columns` prop determines the number of columns to display. You must then pass the same number of children to the component.
 * <br/>
 * Note that the `InkLayout` component is included only as an example. It is not required for this component to function.
 */
const meta: Meta<InkPageLayoutProps> = {
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story, { args }) => (
      <InkLayout
        sideNavigation={<div>Side Navigation</div>}
        headerContent={<div>Header Content</div>}
      >
        <Story
          args={{
            ...args,
            children: args.children ?? (
              <ExampleDynamicContent columns={args.columns} />
            ),
          }}
        />
      </InkLayout>
    ),
  ],
  title: "Layouts/InkPageLayout",
  component: InkPageLayout,
  tags: ["autodocs"],
  args: {
    columns: 1,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {},
};

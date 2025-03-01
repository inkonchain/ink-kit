import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox, CheckboxProps, CheckboxLabel } from "./index";
import { fn } from "@storybook/test";
import { useEffect, useMemo, useState } from "react";
import { ListItem } from "../ListItem";
const meta: Meta<CheckboxProps> = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  args: {
    checked: false,
    indeterminate: false,
    onChange: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  args: {},
  render: (args) => {
    const [checked, setChecked] = useState(args.checked);
    useEffect(() => {
      setChecked(args.checked);
    }, [args.checked]);
    return <Checkbox {...args} checked={checked} onChange={setChecked} />;
  },
};

export const WithLabel: Story = {
  args: {},
  render: (args) => {
    const [checked, setChecked] = useState(args.checked);
    useEffect(() => {
      setChecked(args.checked);
    }, [args.checked]);
    return (
      <CheckboxLabel label="Checkbox">
        <Checkbox {...args} checked={checked} onChange={setChecked} />
      </CheckboxLabel>
    );
  },
};

export const WithLabelAndDescription: Story = {
  args: {},
  render: (args) => {
    const [checked, setChecked] = useState(args.checked);
    useEffect(() => {
      setChecked(args.checked);
    }, [args.checked]);
    return (
      <CheckboxLabel
        label="Checkbox"
        description="Some description of the checkbox"
      >
        <Checkbox {...args} checked={checked} onChange={setChecked} />
      </CheckboxLabel>
    );
  },
};

export const NestingWithIndeterminateState: Story = {
  args: {
    indeterminate: false,
  },
  render: (args) => {
    const [firstChildChecked, setFirstChildChecked] = useState(args.checked);
    const [secondChildChecked, setSecondChildChecked] = useState(args.checked);

    useEffect(() => {
      setFirstChildChecked(true);
      setSecondChildChecked(true);
    }, [args.checked]);

    const checked = useMemo(() => {
      return firstChildChecked && secondChildChecked;
    }, [firstChildChecked, secondChildChecked]);
    const indeterminate = useMemo(() => {
      return firstChildChecked || secondChildChecked;
    }, [checked, firstChildChecked, secondChildChecked]);

    return (
      <div className="ink:flex ink:flex-col ink:gap-1">
        <CheckboxLabel label="Top Level">
          <Checkbox
            {...args}
            indeterminate={indeterminate}
            checked={checked}
            onChange={() => {
              if (checked || indeterminate) {
                setFirstChildChecked(false);
                setSecondChildChecked(false);
              } else {
                setFirstChildChecked(true);
                setSecondChildChecked(true);
              }
            }}
          />
        </CheckboxLabel>
        <div className="ink:flex ink:flex-col ink:pl-2 ink:gap-1">
          <CheckboxLabel label="First Child">
            <Checkbox
              {...args}
              checked={firstChildChecked || checked}
              onChange={setFirstChildChecked}
            />
          </CheckboxLabel>
          <CheckboxLabel label="Second Child">
            <Checkbox
              {...args}
              checked={secondChildChecked || checked}
              onChange={setSecondChildChecked}
            />
          </CheckboxLabel>
        </div>
      </div>
    );
  },
};

/** If you want to use the Checkbox without its own managed state, set checked={undefined} and onChange={undefined}, and add `data-checked={value}` to the parent item. */
export const ManagedByAParentItem: Story = {
  argTypes: {
    onChange: {
      control: false,
    },
  },
  args: {},
  render: (args) => {
    const [checked, setChecked] = useState(args.checked);
    useEffect(() => {
      setChecked(args.checked);
    }, [args.checked]);
    return (
      <ListItem
        onClick={() => setChecked(!checked)}
        data-checked={checked ? "true" : undefined}
        iconLeft={
          <Checkbox {...args} checked={undefined} onChange={undefined} />
        }
      >
        <div>Checkbox</div>
      </ListItem>
    );
  },
};

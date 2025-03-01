import { PropsWithChildren } from "react";
import { classNames } from "../../../util/classes";
import { Slot, Slottable } from "../../Slot";
import { InkIcon } from "../../..";

export interface LargeLinkProps extends PropsWithChildren {
  className?: string;
  asChild?: boolean;
  linkIcon?: React.ReactNode;
  href?: string;
  target?: string;
}

export const LargeLink = ({
  children,
  className,
  asChild,
  linkIcon = (
    <InkIcon.Arrow className="ink:size-3 ink:rotate-270 ink:shrink-0" />
  ),
  href,
  target,
}: LargeLinkProps) => {
  const Component = asChild ? Slot : "a";
  return (
    <Component
      href={href}
      target={target}
      className={classNames(
        "ink:p-3 ink:bg-button-secondary ink:text-[--ink-card-default-color] ink:text-h5 ink:rounded-lg ink:box-border",
        "ink:flex ink:justify-between ink:items-center ink:gap-0.5",
        "ink:min-w-[200px]",
        href && "ink:cursor-pointer ink:hover:bg-button-secondary-hover",
        className
      )}
    >
      <Slottable child={children}>
        {(child) => (
          <>
            <div className="ink:overflow-ellipsis ink:overflow-hidden ink:whitespace-nowrap">
              {child}
            </div>
            {linkIcon}
          </>
        )}
      </Slottable>
    </Component>
  );
};

LargeLink.displayName = "LargeLink";

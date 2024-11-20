import React, { type ElementType } from "react";
import {
  classNames,
  resetClasses,
  variantClassNames,
} from "../../util/classes";
import { PolymorphicProps } from "../polymorphic";

const DEFAULT_BUTTON_TAG = "button" as const;

//test
export type ButtonProps<T extends ElementType = typeof DEFAULT_BUTTON_TAG> =
  PolymorphicProps<T> & {
    variant?: "primary" | "secondary";
    size?: "sm" | "md";
    rounded?: "full" | "default";
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
  };

export const Button = <T extends ElementType = typeof DEFAULT_BUTTON_TAG>({
  as,
  className,
  children,
  variant = "primary",
  size = "sm",
  rounded = "default",
  iconLeft,
  iconRight,
  ...restProps
}: ButtonProps<T>) => {
  const Component = as ?? DEFAULT_BUTTON_TAG;

  return (
    <Component
      className={classNames(
        resetClasses,
        "ink-rounded-full ink-font-bold ink-transition-colors disabled:ink-cursor-not-allowed ink-duration-100",
        "ink-flex ink-items-center ink-justify-center ink-gap-1 ink-select-none",
        variantClassNames(variant, {
          primary:
            "ink-bg-primary ink-text-text-on-primary hover:ink-bg-primary-hover disabled:ink-bg-primary-disabled disabled:ink-text-text-on-primary-disabled active:ink-bg-primary-pressed",
          secondary:
            "ink-bg-secondary ink-text-text-on-secondary hover:ink-bg-secondary-hover disabled:ink-bg-secondary-disabled disabled:ink-text-text-on-secondary-disabled active:ink-bg-secondary-pressed",
        }),
        variantClassNames(size, {
          sm: "ink-px-3 ink-py-2 ink-text-body-2",
          md: "ink-px-4 ink-py-2.5 ink-text-h4",
        }),
        variantClassNames(rounded, {
          full: variantClassNames(size, {
            sm: "ink-rounded-full ink-px-1.5 ink-py-1.5",
            md: "ink-rounded-full ink-px-2.5 ink-py-2.5",
          }),
          default: "",
        }),
        className
      )}
      {...restProps}
    >
      {iconLeft && (
        <div
          className={variantClassNames(size, {
            sm: "ink-size-3 -ink-my-1",
            md: "ink-size-3",
          })}
        >
          {iconLeft}
        </div>
      )}
      {rounded === "full" ? (
        <div
          className={classNames(
            variantClassNames(size, {
              /** This here is a small exception to our spacing design so that the icon is 24px, but also matches the height of the small button */
              sm: "ink-size-3 -ink-m-[2px]",
              md: "ink-size-3",
            })
          )}
        >
          {children}
        </div>
      ) : (
        <div
          className={classNames(
            variantClassNames(size, {
              /** This here accomplishes the "snug" spacing, which makes the box height as tight as possible */
              sm: "-ink-my-0.5",
              md: "",
            })
          )}
        >
          {children}
        </div>
      )}
      {iconRight && (
        <div
          className={variantClassNames(size, {
            sm: "ink-size-3 -ink-m-[2px]",
            md: "ink-size-3",
          })}
        >
          {iconRight}
        </div>
      )}
    </Component>
  );
};

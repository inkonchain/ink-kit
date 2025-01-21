import React from "react";
import { classNames } from "../../util/classes";
import { Slot } from "../Slot";

export interface CardProps {
  title: React.ReactNode;
  description: React.ReactNode;
  className?: string;
  image?: (props: { className: string }) => React.ReactNode;
  imageLocation?: "left" | "right" | "top";
  mainLabels?: React.ReactNode;
  secondaryLabels?: React.ReactNode;
  variant?: "light" | "dark";
  asChild?: boolean;
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  className,
  image,
  imageLocation,
  mainLabels,
  secondaryLabels,
  variant,
  asChild,
}) => {
  const Component = asChild ? Slot : "div";
  return (
    <Component
      className={classNames(
        "ink:flex ink:flex-wrap ink:p-2 ink:pb-3 lg:ink:p-3 ink:gap-3 ink:rounded-md lg:ink:rounded-lg ink:justify-center",
        "ink:font-default",
        imageLocation === "left" || imageLocation === "right"
          ? "ink:flex-row"
          : "ink:flex-col",
        imageLocation === "right" && "ink:flex-row-reverse",
        variant === "dark"
          ? "ink:bg-background-dark"
          : "ink:bg-background-light",
        className
      )}
    >
      <div className="ink:rounded-sm ink:overflow-hidden">
        <div
          className={classNames(
            "ink:relative",
            imageLocation === "left" || imageLocation === "right"
              ? "ink:h-full"
              : "ink:w-full"
          )}
        >
          {(mainLabels || secondaryLabels) && (
            <div
              className={classNames(
                "ink:absolute ink:top-0 ink:left-0 ink:right-0",
                "ink:px-2 sm:ink:px-3 md:ink:px-4 ink:pt-2 sm:ink:pt-2 md:ink:pt-4",
                "ink:flex ink:justify-between ink:items-start ink:gap-2 ink:z-10",
                "ink:whitespace-nowrap"
              )}
            >
              <div>{mainLabels}</div>
              <div className="ink:flex ink:gap-1 ink:flex-wrap ink:flex-1 ink:justify-end">
                {secondaryLabels}
              </div>
            </div>
          )}
          {image && (
            <div
              className={classNames(
                "ink:aspect-video",
                imageLocation === "left" || imageLocation === "right"
                  ? "ink:h-full ink:max-w-xl"
                  : "ink:w-full"
              )}
            >
              {image({
                className: classNames(
                  "ink:object-cover ink:object-center ink:w-full ink:h-full"
                ),
              })}
            </div>
          )}
        </div>
      </div>
      <div
        className={classNames(
          "ink:flex ink:flex-col ink:flex-1 ink:gap-2 xl:ink:gap-4 ink:p-3 ink:text-text-default"
        )}
      >
        <h2 className="ink:text-h2">{title}</h2>
        <div
          className={classNames(
            "ink:flex-1 ink:flex ink:flex-col ink:justify-between ink:gap-3 ink:text-body-2-regular"
          )}
        >
          {description}
        </div>
      </div>
    </Component>
  );
};

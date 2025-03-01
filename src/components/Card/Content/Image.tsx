import * as React from "react";
import { classNames } from "../../../util/classes";
import { Slot } from "../../Slot";

export interface ImageProps extends React.PropsWithChildren {
  variant?: "default" | "square";
  className?: string;
  mainLabels?: React.ReactNode;
  secondaryLabels?: React.ReactNode;
}

export const Image: React.FC<ImageProps> = ({
  className,
  variant,
  mainLabels,
  secondaryLabels,
  children,
}) => {
  return (
    <div
      className={classNames(
        "ink:rounded-[--ink-card-rounded] ink:overflow-hidden ink:box-border ink:relative",
        className
      )}
    >
      {(mainLabels || secondaryLabels) && (
        <div
          className={classNames(
            "ink:absolute ink:top-0 ink:left-0 ink:right-0",
            "ink:px-2 sm:ink:px-3 md:ink:px-4 ink:pt-2 sm:ink:pt-2 md:ink:pt-4",
            "ink:flex ink:justify-between ink:items-start ink:gap-1 ink:z-10 ink:flex-wrap",
            "ink:whitespace-nowrap"
          )}
        >
          <div className="ink:flex ink:gap-1 ink:flex-wrap ink:flex-1 ink:justify-start">
            {mainLabels}
          </div>
          {secondaryLabels && (
            <div className="ink:flex ink:gap-1 ink:flex-wrap ink:flex-0 ink:justify-start">
              {secondaryLabels}
            </div>
          )}
        </div>
      )}
      <Slot
        className={classNames(
          "ink:object-cover ink:object-center ink:w-full ink:h-full",
          variant === "square" && "ink:aspect-square"
        )}
      >
        {children}
      </Slot>
    </div>
  );
};

Image.displayName = "Image";

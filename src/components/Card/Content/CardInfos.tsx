import { PropsWithChildren } from "react";
import { classNames } from "../../../util/classes";

export interface CardInfosProps extends PropsWithChildren {
  className?: string;
  children: React.ReactNode;
}

export const CardInfos = ({ children, className }: CardInfosProps) => {
  return (
    <div
      className={classNames(
        "ink:grid ink:grid-cols-[repeat(auto-fit,minmax(max(200px,calc(100%/3)),1fr))] ink:gap-1 ink:box-border",
        className
      )}
    >
      {children}
    </div>
  );
};

CardInfos.displayName = "CardInfos";

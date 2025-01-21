import { PropsWithChildren } from "react";

export interface PillProps {
  icon?: React.ReactNode;
}

export const Pill: React.FC<PillProps & PropsWithChildren> = ({
  icon,
  children,
}) => {
  return (
    <div className="ink:text-default ink:text-xs ink:flex ink:items-center ink:justify-center ink:gap-1 ink:px-2 ink:py-1 ink:font-bold ink:rounded-full ink:overflow-hidden ink:z-10 dark:ink:text-text-default ink:backdrop-blur-lg ink:shadow">
      <span className="ink:flex ink:gap-1 ink:items-center">
        {icon}
        {children}
      </span>
    </div>
  );
};

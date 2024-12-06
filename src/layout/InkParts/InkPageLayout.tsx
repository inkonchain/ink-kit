import { PropsWithChildren } from "react";
import { classNames, variantClassNames } from "../../util/classes";

export interface InkPageLayoutProps extends PropsWithChildren {
  columns?: 1 | 2 | 3;
}

export const InkPageLayout: React.FC<InkPageLayoutProps> = ({
  columns = 1,
  children,
}) => {
  return (
    <div
      className={classNames(
        "ink:grid ink:gap-1 ink:*:h-full ink:auto-rows-min ink:md:auto-rows-auto ink:flex-1",
        variantClassNames(columns, {
          1: "ink:grid-cols-1",
          2: "ink:md:grid-cols-[minmax(240px,1fr)_360px]",
          3: "ink:*:first:sm:row-span-2 ink:*:first:xl:row-span-1 ink:md:auto-rows-min ink:xl:auto-rows-auto ink:md:grid-cols-[240px_minmax(240px,1fr)] ink:xl:grid-cols-[240px_minmax(240px,1fr)_360px]",
        }),
        "ink:*:bg-background-light ink:*:rounded-lg"
      )}
    >
      {children}
    </div>
  );
};

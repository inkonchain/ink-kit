import { PropsWithChildren } from "react";
import { classNames, resetClasses } from "../../util/classes";
import { InkPlaceholderLogo } from "../../icons/InkPlaceholderLogo";

export interface InkLayoutProps extends PropsWithChildren {
  mainIcon?: React.ReactNode;
  headerContent?: React.ReactNode;
  sideNavigation?: React.ReactNode;
  topNavigation?: React.ReactNode;
}

export const InkLayout: React.FC<InkLayoutProps> = ({
  mainIcon = <InkPlaceholderLogo className="ink-size-6" />,
  headerContent,
  sideNavigation,
  topNavigation,
  children,
}) => {
  return (
    <div
      className={classNames(
        resetClasses,
        "ink-flex ink-flex-col ink-min-h-screen ink-min-w-[320px] ink-font-default ink-text-text-default ink-gap-5"
      )}
    >
      <div className="ink-w-full ink-flex ink-justify-between ink-items-center ink-gap-3 ink-px-5 ink-pt-4">
        <div className="ink-flex ink-items-center ink-justify-start ink-size-6 ink-gap-2">
          {mainIcon}
        </div>
        {topNavigation && <div>{topNavigation}</div>}
        {headerContent ? (
          <div className="ink-flex ink-items-center">{headerContent}</div>
        ) : null}
      </div>
      <div className="ink-flex ink-flex-1">
        {sideNavigation && (
          <div className={classNames("ink-w-[260px] ink-px-4")}>
            {sideNavigation}
          </div>
        )}
        <div className="ink-flex-1 ink-bg-background-light ink-rounded-24 ink-shadow-layout ink-p-3 ink-mr-5">
          {children}
        </div>
      </div>
    </div>
  );
};

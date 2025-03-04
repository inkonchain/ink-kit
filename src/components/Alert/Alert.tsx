import React, { useEffect, useState } from "react";
import { classNames, variantClassNames } from "../../util/classes";
import { InkIcon } from "../..";

export interface AlertProps {
  title: string;
  description?: React.ReactNode;
  variant?: "success" | "error" | "warning" | "info";
  icon?: React.ReactNode;
  className?: string;
  /**
   * Unique identifier for the alert. Required if dismissible is true.
   */
  id?: string;
  /**
   * Whether the alert can be dismissed. If true, id is required.
   */
  dismissible?: boolean;
  /**
   * Callback fired when the alert is dismissed
   */
  onDismiss?: () => void;
}

export const Alert: React.FC<AlertProps> = ({
  title,
  description,
  variant = "info",
  icon,
  className,
  id,
  dismissible,
  onDismiss,
}) => {
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (dismissible && id) {
      const isDismissedStored = localStorage.getItem(`ink-alert-${id}`);
      setIsDismissed(isDismissedStored === "true");
    }
  }, [dismissible, id]);

  if (isDismissed) {
    return null;
  }

  const defaultIcon = {
    success: <InkIcon.Check />,
    error: <InkIcon.Error />,
    warning: <InkIcon.Warning />,
    info: <InkIcon.Settings />,
  }[variant];

  const handleDismiss = () => {
    if (dismissible && id) {
      localStorage.setItem(`ink-alert-${id}`, "true");
      setIsDismissed(true);
      onDismiss?.();
    }
  };

  return (
    <div
      className={classNames(
        "ink:flex ink:gap-3 ink:p-3 ink:rounded-md ink:font-default",
        variantClassNames(variant, {
          success: "ink:bg-status-success-bg ink:text-status-success",
          error: "ink:bg-status-error-bg ink:text-status-error",
          warning: "ink:bg-status-alert-bg ink:text-status-alert",
          info: "ink:bg-background-light ink:text-text-default",
        }),
        className
      )}
    >
      <div className="ink:size-4 ink:shrink-0">{icon || defaultIcon}</div>
      <div className="ink:flex ink:flex-col ink:gap-1 ink:flex-1">
        <div className="ink:text-body-2-bold">{title}</div>
        {description && (
          <div className="ink:text-body-2-regular">{description}</div>
        )}
      </div>
      {dismissible && (
        <button
          onClick={handleDismiss}
          className="ink:size-4 ink:shrink-0 ink:opacity-60 hover:ink:opacity-100 ink:cursor-pointer"
          aria-label="Dismiss alert"
        >
          <InkIcon.Close />
        </button>
      )}
    </div>
  );
};

Alert.displayName = "Alert";

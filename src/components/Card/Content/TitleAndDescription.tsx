import { classNames, variantClassNames } from "../../../util/classes";

export interface TitleAndDescriptionProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  size?: "default" | "small" | "cardInfo";
}

export const TitleAndDescription = ({
  title,
  description,
  size = "default",
}: TitleAndDescriptionProps) => {
  return (
    <div className="ink:flex ink:flex-col ink:gap-2">
      <h3
        className={classNames(
          "ink:text-body-1-bold ink:text-[--ink-card-default-color] ink:box-border ink:m-0 ink:-my-px",
          variantClassNames(size, {
            default: "ink:text-h3",
            small: "ink:text-body-1-regular",
            cardInfo: "ink:text-h5",
          })
        )}
      >
        {title}
      </h3>
      {description && (
        <div
          className={classNames(
            "ink:text-body-3-regular ink:text-[--ink-card-muted-color] ink:box-border ink:m-0",
            variantClassNames(size, {
              default: "ink:text-body-1-regular",
              small: "ink:text-body-3-regular",
              cardInfo: "ink:text-body-2-regular",
            })
          )}
        >
          {description}
        </div>
      )}
    </div>
  );
};

TitleAndDescription.displayName = "TitleAndDescription";

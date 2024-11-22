import { DefaultAppIcon } from ".";

export const InkPlaceholderLogo: React.FC<React.SVGProps<SVGSVGElement>> = (
  props
) => {
  return (
    <div className="ink-group">
      <DefaultAppIcon {...props} />
    </div>
  );
};

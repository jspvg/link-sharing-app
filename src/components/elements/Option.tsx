import { Platform } from "../../lib/types";

interface OptionProps {
  platform: Platform;
}

const Option = ({ platform }: OptionProps) => (
  <div className="option-gap">
    <img src={platform.logo_gray} alt={platform.name} />
    {platform.name}
  </div>
);

export default Option;

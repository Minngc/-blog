import link16 from "@image/link-16.svg";
import link24 from "@image/link-24.svg";
import { CenterIcon } from "./Icon";

const LinkIcon = (props: { size?: 16 | 24 | undefined }) => {
  return !props.size || props.size === 16 ? (
    <CenterIcon src={link16} alt="home-16 icon" width={16} height={16}/>
  ) : (
    <CenterIcon src={link24} alt="home-24 icon" width={24} height={24}/>
  );
};

export { LinkIcon };

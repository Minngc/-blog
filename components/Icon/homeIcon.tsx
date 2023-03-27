import home16 from "@image/home-16.svg";
import home24 from "@image/home-24.svg";
import { CenterIcon } from "./Icon";

const HomeIcon = (props: { size?: 16 | 24 | undefined }) => {
  return !props.size || props.size === 16 ? (
    <CenterIcon src={home16} alt="home-16 icon" width={16} height={16} />
  ) : (
    <CenterIcon src={home24} alt="home-24 icon" width={24} />
  );
};

export { HomeIcon };

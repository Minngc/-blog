import person16 from "@image/person-16.svg";
import person24 from "@image/person-24.svg";
import { CenterIcon } from "./Icon";

const PersonIcon = (props: { size?: 16 | 24 | undefined }) => {
  return !props.size || props.size === 16 ? (
    <CenterIcon src={person16} alt="home-16 icon" width={16} height={16}/>
  ) : (
    <CenterIcon src={person24} alt="home-24 icon" width={24} height={24}/>
  );
};

export { PersonIcon };
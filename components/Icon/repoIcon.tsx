import repo16 from "@image/repo-16.svg";
import repo24 from "@image/repo-24.svg";
import { CenterIcon } from "./Icon";

const RepoIcon = (props: { size?: 16 | 24 | undefined }) => {
  return !props.size || props.size === 16 ? (
    <CenterIcon src={repo16} alt="home-24 icon" width={16} height={16} />
  ) : (
    <CenterIcon src={repo24} alt="home-24 icon" width={24} height={24} />
  );
};

export { RepoIcon };

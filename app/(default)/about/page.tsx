import { AvatarWithBackground } from "@/components/avatar";
import classNames from "classnames";
import styles from "./page.module.scss";

const About = () => {
  return (
    <>
      <AvatarWithBackground unable size={140} height={120} offset={50} />
      <div className={classNames(styles.nickname)}>Ming</div>
    </>
  );
};

export default About;

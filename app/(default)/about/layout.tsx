import { ReactNode } from "react";
import classNames from "classnames";
import styles from "./page.module.scss";
import { Line } from "@/components/line";

const AboutLayout = (props: {
  children: ReactNode;
  info: ReactNode;
  links: ReactNode;
}) => {
  const { children, info, links } = props;

  return (
    <>
      {children}
      <Line color="#000000" marginTop="10px" />
      <div className={classNames(styles.info)}>{info}</div>
      <div className={classNames(styles.links)}>{links}</div>
    </>
  );
};

export default AboutLayout;

import { ReactNode } from "react";
import classNames from "classnames";
import styles from "./page.module.scss";

const AboutLayout = async (props: {
  children: ReactNode;
  info: ReactNode;
  links: ReactNode;
}) => {
  const { children, info, links } = props;

  return (
    <>
      {children}
      <div className={classNames(styles.info)}>
        {info}
        {links}
      </div>
    </>
  );
};

export default AboutLayout;

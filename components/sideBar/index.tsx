import classNames from "classnames";
import styles from "./index.module.scss";
import { Line } from "../line";
import { ReactNode } from "react";

const SideBarCard = (props: {
  className?: { cardContainer?: string };
  children: ReactNode;
  sideNode?: ReactNode;
  title: string;
}) => {
  const {
    children,
    title,
    className = { cardContainer: "" },
    sideNode,
  } = props;
  return (
    <div className={classNames(styles.container)}>
      <div className={classNames(styles.header)}>
        <div className={styles.title}>{title}</div>
        {sideNode}
      </div>
      <Line />
      <div
        className={classNames(styles.cardContainer, className.cardContainer)}
      >
        {children}
      </div>
    </div>
  );
};

export { SideBarCard };

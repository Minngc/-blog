import classNames from "classnames";
import { ReactNode } from "react";
import styles from "./page.module.scss";
import { ControlPanel } from "@/components/control-panel";

const Layout = (props: { children: ReactNode; sidebar: ReactNode }) => {
  const { children, sidebar } = props;
  return (
    <>
      <div className={classNames(styles.timeLine)}>
        <div className={classNames(styles.timeLineContainer)}>{children}</div>
        <div className={classNames(styles.sideBar)}>{sidebar}</div>
      </div>
    </>
  );
};

export default Layout;

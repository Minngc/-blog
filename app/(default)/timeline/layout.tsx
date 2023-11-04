import classNames from "classnames";
import { ReactNode } from "react";
import styles from "./page.module.scss";

const Layout = (props: { children: ReactNode; sidebar: ReactNode }) => {
  const { children, sidebar } = props;
  return (
    <>
      <div className={styles.topbar} />
      <div className={classNames(styles.timeLine)}>
        {children}

        {/* <div className={classNames(styles.sideBar)}>{sidebar}</div> */}
      </div>
    </>
  );
};

export default Layout;

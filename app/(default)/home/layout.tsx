import { AvatarWithBackground } from "@/components/avatar";
import { ReactNode } from "react";
import styles from "./page.module.scss";
import classNames from "classnames";

const HomeLayout = (props: { children: ReactNode; sidebar: ReactNode }) => {
  const { children, sidebar } = props;
  return (
    <>
      <AvatarWithBackground size={140} height={120} offset={50} />
      <div className={classNames(styles.homeContainer)}>
        <div className={styles.articleList}>{children}</div>
        <div className={classNames(styles.sideBar)}>{sidebar}</div>
      </div>
    </>
  );
};

export default HomeLayout;

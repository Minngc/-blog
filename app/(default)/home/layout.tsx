"use client";

import { AvatarWithBackground } from "@/components/avatar";
import { Line } from "@/components/line";
import { ReactNode, useCallback, useState } from "react";
import styles from "./page.module.scss";
import classNames from "classnames";

const HomeLayout = (props: { children: ReactNode; sidebar: ReactNode }) => {
  const [panelPosition, setPanelPosition] = useState<"left" | "right">("left");

  const handleLeftPanel = useCallback(() => {
    setPanelPosition("right");
  }, []);
  const handleRightPanel = useCallback(() => {
    setPanelPosition("left");
  }, []);
  const { children, sidebar } = props;
  return (
    <>
      <AvatarWithBackground
        size={140}
        height={120}
        offset={50}
        onLeftClick={handleLeftPanel}
        onRightClick={handleRightPanel}
      />
      <Line color="#000000" marginTop="15px" />
      <div className={classNames(styles.viewPanel)}>
        <div
          className={classNames(styles.homeContainer, {
            [styles.showAnotherPanel]: panelPosition === "left",
          })}
        >
          <div className={styles.articleList}>{children}</div>
          <div
            className={classNames(styles.sideBar, {
              [styles.sideBarShow]: panelPosition === "left",
            })}
          >
            {sidebar}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeLayout;

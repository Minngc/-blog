"use client";

import styles from "./index.module.scss";
import { useState, useEffect, MouseEventHandler, useCallback } from "react";
import classNames from "classnames";

const ControlPanel = () => {
  const [showToTop, setShowToTop] = useState(false);
  const scrollToTop: MouseEventHandler<HTMLDivElement> = useCallback((e) => {
    console.log("scroll");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [settingPanelShow, setSettingPanelShow] = useState(true);
  const handleSettingPanel: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      setSettingPanelShow((pre) => !pre);
    },
    []
  );

  const handleTheme = useCallback(() => {
    const dataset = document.getElementsByTagName("html")[0].dataset;
    const theme = dataset.theme;
    if (theme === undefined) {
      dataset.theme = "dark";
      return;
    }
    if (theme === "dark") {
      delete dataset.theme;
      return;
    }
    delete dataset.theme;
  }, []);
  useEffect(() => {
    function toTopShow(e: Event) {
      setTimeout(() => {
        if (window.scrollY >= 300) {
          setShowToTop(true);
        }
        if (window.scrollY < 300) {
          setShowToTop(false);
        }
      }, 200);
    }
    document.addEventListener("scroll", toTopShow);
    return () => {
      document.removeEventListener("scroll", toTopShow);
    };
  }, []);
  return (
    <>
      <div className={classNames(styles.controlPanel_container, {})}>
        <div
          onClick={scrollToTop}
          className={classNames(styles.controlPanel_toTop, {
            [styles.toTop_hidden]: !showToTop,
          })}
        >
          <div className={styles.toTop_triangle}>
            <div className={styles.toTop_triangleRound} />
          </div>
        </div>
        <div
          onClick={handleSettingPanel}
          className={styles.controlPanel_settingPanelSwitch}
        >
          <div className={styles.controlPanel_gear}>
            <div className={styles.controlPanel_gearPanel} />
            <div className={styles.controlPanel_gearDent} />
            <div className={styles.controlPanel_gearDent} />
            <div className={styles.controlPanel_gearDent} />
            <div className={styles.controlPanel_gearDent} />
            <div className={styles.controlPanel_gearShaft} />
          </div>
        </div>
        <div
          onClick={handleTheme}
          className={classNames(styles.controlPanel_themeControlButton, {
            [styles.settingPanel_hidden]: !settingPanelShow,
          })}
        >
          <div className={styles.themeControlButton_circle} />
          <div className={styles.themeControlButton_ellipse} />
        </div>
      </div>
    </>
  );
};

export { ControlPanel };

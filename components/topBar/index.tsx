"use client";
// import { luxuriousScript } from "public/fonts";
import classNames from "classnames";
import Link from "next/link";
import styles from "./index.module.scss";
import { useState } from "react";
import topmenu from "@/external/config/pages-config/topmenu.json";

const TopBar = () => {
  const [fold, setFolded] = useState<boolean>(true);
  let lengthWithoutSplite = 0;
  topmenu.forEach((value) => {
    if (value.name !== "__splite-line__") {
      lengthWithoutSplite++;
    }
  });
  return (
    <>
      <div className={classNames([styles.des])} />
      <div className={classNames([styles.topBarContainer])}>
        <div
          className={classNames(
            //luxuriousScript.variable,
            [styles.topBarTitle]
          )}
        >
          {"Ming's Blog"}
        </div>
        <div className={classNames(styles.Iconcontainer)}>
          <div
            onClick={() => setFolded((pre) => !pre)}
            className={classNames(styles.menuIcon, {
              [styles.closeIcon]: !fold,
            })}
          >
            <div className={classNames(styles.line)} />
            <div className={classNames(styles.line)} />
            <div className={classNames(styles.line)} />
          </div>
        </div>

        <ul className={classNames([styles.topBarMenu], styles.topMenu)}>
          {topmenu.map((value, index) => {
            if (value.name === "__splie-line__")
              return (
                <li
                  key={`${value.href}_${value.name}_top_${index}`}
                  className={classNames(styles.menuItem, styles.spliteLine)}
                >
                  <span></span>
                </li>
              );
            return (
              <li
                key={`${value.href}_${value.name}_top`}
                className={styles.menuItem}
              >
                <Link href={value.href}>{value.name}</Link>
              </li>
            );
          })}
        </ul>
      </div>

      <ul
        style={{ "--items": lengthWithoutSplite }}
        className={classNames([styles.topBarMenu], styles.exMenu, {
          [styles.collapseMenu]: !fold,
        })}
      >
        {topmenu.map((value, index) => {
          if (value.name === "__splie-line__")
            return (
              <li
                key={`${value.href}_${value.name}_ex_${index}`}
                className={classNames(styles.menuItem, styles.spliteLine)}
              >
                <span></span>
              </li>
            );
          return (
            <li
              key={`${value.href}_${value.name}_ex`}
              className={styles.menuItem}
            >
              <Link href={value.href}>{value.name}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export { TopBar };

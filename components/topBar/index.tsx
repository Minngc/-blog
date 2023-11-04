"use client";

// import { luxuriousScript } from "public/fonts";
import classNames from "classnames";
import styles from "./index.module.scss";
import { useState } from "react";
import { MenuIconToCloseIcon } from "../icons";
import Link from "next/link";
import { LocalLuxuriousScript } from "@/public/fonts/local/luxuriousScript";

const TopBar = (props: { menuList: { href: string; name: string }[] }) => {
  const { menuList } = props;
  const [fold, setFolded] = useState<boolean>(true);
  let lengthWithoutSplite = 0;
  menuList.forEach((value) => {
    if (value.name !== "__splite-line__") {
      lengthWithoutSplite++;
    }
  });
  return (
    <>
      <div className={classNames([styles.des])} />
      <div className={classNames([styles.topBarContainer])}>
        <Link
          href={"/home"}
          className={classNames(
            LocalLuxuriousScript.variable,
            //luxuriousScript.variable,
            [styles.topBarTitle]
          )}
        >
          {"Ming's Blog"}
        </Link>
        <MenuIconToCloseIcon
          className={styles.menuHidden}
          onClick={() => setFolded((pre) => !pre)}
          change={!fold}
        />

        <ul className={classNames([styles.topBarMenu], styles.topMenu)}>
          {menuList.map((value, index) => {
            if (value.name === "__splie-line__")
              return (
                <li
                  key={`${value.href}_${value.name}_top_${index}`}
                  className={classNames(styles.menuItem, styles.spliteLine)}
                >
                  <span />
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
        {menuList.map((value) => {
          if (value.name === "__splie-line__") return null;
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

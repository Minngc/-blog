import { useState } from "react";
import classNames from "classnames";
import styles from "./index.module.scss";
import {
  BoxIcon,
  HomeIcon,
  BookIcon,
  PenIcon,
  DailyIcon,
  LinkIcon,
  HatIcon,
  EntertainmentIcon,
  SearchIcon,
  TriangleIcon,
} from "@/Icon";

const LargeNav = () => {
  const [fold, setFold] = useState<boolean>();
  return (
    <>
      <header className={classNames([styles.headerNav])}>
        <div className={classNames([styles.logo])}>{"Ming's Blog"}</div>
        <nav className={classNames([styles.menuNav])}>
          <ul className={classNames([styles.menunavUl])}>
            <li>
              <HomeIcon />
              首页
            </li>
            <li>
              <BookIcon />
              文章
            </li>
            <li
              className={classNames({ [styles.foldTest]: !fold })}
              onMouseEnter={() => {
                setFold(false);
                console.log(fold);
              }}
              onMouseLeave={() => {
                setFold(true);
                console.log(fold);
              }}
            >
              <BoxIcon />
              汇总
              <div
                className={classNames([styles.Panel], {
                  [styles.PanelOut]: fold ?? true,
                })}
              >
                <div className={classNames([styles.triangleBox])}>
                  <TriangleIcon />
                </div>
                <ul className={classNames([styles.collaspe])}>
                  <li>
                    <PenIcon />
                    学习
                  </li>
                  <li>
                    <DailyIcon />
                    日常
                  </li>
                  <li>
                    <EntertainmentIcon />
                    娱乐
                  </li>
                </ul>
              </div>
            </li>

            <li>
              <LinkIcon />
              友链
            </li>
            <li>
              <HatIcon />
              关于
            </li>
          </ul>
        </nav>
        <div className={classNames([styles.searchLogo])}>
          <SearchIcon />
          search
        </div>
      </header>
    </>
  );
};

export { LargeNav };

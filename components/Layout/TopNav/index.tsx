import { useState, useEffect } from "react";
import classNames from "classnames";
import styles from "./index.module.scss";
import { SearchIcon } from "@/Icon";
import { AsideMenu } from "@/menu/asideMenu";
import { TopMenu } from "@/menu/topMenu";
import { PathContext } from "context";
import {
  useHeaderNavHiddenEffect,
  useWidthSizeEffect,
  useRouterEffect,
} from "lib/hooks/effects";
import { useRouter } from "next/router";
import { allison, XWSC } from "@fonts/index";

type WidthSizeType = "mobile" | "small" | "middle" | "small" | "large";

const TopNav = () => {
  const { asPath } = useRouter();
  const [navHidden, setNavHidden] = useState<boolean>();
  const [pathnameArray, setPathnameArray] = useState<string[]>(
    asPath.split("/").map((path) => `/${path}`),
  );
  const [innerWidthSize, setInnerWidthSize] = useState<WidthSizeType>();
  const [topMenuHidden, setTopMenuHidden] = useState<boolean>();
  const [asideMenuHidden, setAsideMenuHidden] = useState<boolean>(true);
  const smallScreen = innerWidthSize === "small" || innerWidthSize === "mobile";
  useRouterEffect(setPathnameArray);
  useWidthSizeEffect(setInnerWidthSize);
  useHeaderNavHiddenEffect(setNavHidden);
  useEffect(() => setTopMenuHidden(false), []);
  useEffect(() => {
    console.log(asPath);
  });
  useEffect(() => {
    console.log(pathnameArray);
  }, [pathnameArray]);
  useEffect(() => {
    setPathnameArray(asPath.split("/").map((path) => `/${path}`));
  }, [asPath]);

  return (
    <>
      <PathContext.Provider value={pathnameArray}>
        <header
          className={classNames([styles.headerNav],[XWSC.variable], {
            [styles.hiddenHeaderNav]: navHidden,
          })}
        >
          <div
            style={{ fontFamily: `${allison.style.fontFamily}` }}
            className={`${classNames([styles.logo])} ${allison.variable}`}
            onClick={() => {
              !smallScreen && setTopMenuHidden(!topMenuHidden);
              smallScreen && setAsideMenuHidden(!asideMenuHidden);
            }}
          >
            {"Ming's Blog"}
          </div>
          {!smallScreen && <TopMenu menuHidden={topMenuHidden} />}

          <div className={classNames([styles.searchLogo])}>
            <SearchIcon />
            search
          </div>
        </header>
        {smallScreen && (
          <AsideMenu
            hidden={asideMenuHidden}
            handleMenu={() => {
              setAsideMenuHidden(true);
            }}
          />
        )}
      </PathContext.Provider>
    </>
  );
};

export { TopNav };

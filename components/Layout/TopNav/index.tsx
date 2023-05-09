import { useState, useEffect } from "react";
import classNames from "classnames";
import styles from "./index.module.scss";
import { SearchIcon } from "@/Icon";
import { AsideMenu } from "@/menu/asideMenu";
import { TopMenu } from "@/menu/topMenu";
import { LXGW } from "@fonts/index";
import { PathContext } from "context";
import {
  useHeaderNavHiddenEffect,
  useWidthSizeEffect,
  useRouterEffect,
} from "lib/hooks/effects";
import { useRouter } from "next/router";

type WidthSizeType = "mobile" | "small" | "middle" | "small" | "large";

const TopNav = () => {
  const { asPath } = useRouter();
  const [navHidden, setNavHidden] = useState<boolean>();
  const [pathnameArray, setPathnameArray] = useState<string[]>(
    asPath.split("/").map((path) => `/${path}`),
  );
  // ["mobile", "small", "middle", "large",]
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
          className={classNames([styles.headerNav], [LXGW.variable], {
            [styles.hiddenHeaderNav]: navHidden,
          })}
        >
          <div
            className={classNames([styles.logo])}
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
        {/* <div style={{ background: "white", height: "300px", width: "300px" }} />
      <div style={{ background: "red", height: "300px", width: "300px" }} />
      <div style={{ background: "black", height: "300px", width: "300px" }} />
      <div style={{ background: "black", height: "300px", width: "300px" }} />
      <div style={{ background: "white", height: "300px", width: "300px" }} />
      <div style={{ background: "black", height: "300px", width: "300px" }} /> */}
      </PathContext.Provider>
    </>
  );
};

export { TopNav };

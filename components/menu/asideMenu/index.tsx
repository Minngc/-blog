import styles from "./index.module.scss";
import classNames from "classnames";
import Image from "next/image";
import avator from "@image/jpg/avator.jpg";
import { LXGW } from "@fonts/index";
import DotedSplitLine from "@/decoration/dotedSplitLine";
import {  useRef } from "react";
import { SnsList } from "./snsList";
import { MenuList } from "./menuList";

const AsideMenu = (props: { hidden: boolean; handleMenu: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { hidden, handleMenu } = props;

  return (
    <>
      <div
        onClick={handleMenu}
        className={`${styles.muskHidden} ${classNames({
          [styles.muskDisplay]: !hidden,
        })}`}
      />
      <aside
        ref={ref}
        className={`${styles.menuContainerHidden} ${classNames(
          [LXGW.variable],
          {
            [styles.menuContainerDisplay]: !hidden,
          },
        )}`}
      >
        <div className={`${styles.menuHeader}`}>
          {/* 没想好 */}
          <div className={classNames(styles.menuTop)} onClick={handleMenu} />
          <div className={`${styles.avator}`}>
            <Image src={avator} alt={"avator"} width={80} height={80} />
          </div>
          <DotedSplitLine />
          <SnsList />
          <DotedSplitLine />
        </div>
        <div className={`${styles.menuContent}`}>
          <MenuList />
        </div>
      </aside>
    </>
  );
};

export { AsideMenu };

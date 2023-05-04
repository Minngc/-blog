import styles from "./index.module.scss";
import classNames from "classnames";
import Image from "next/image";
import avator from "@image/jpg/avator.jpg";
import DotedSplitLine from "@/decoration/dotedSplitLine";

import { useRef, useEffect } from "react";
import { SnsList } from "./snsList";
import { MenuList } from "./menuList";

const Menu = (props: {
  visible: boolean | undefined;
  handleMenu: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { visible, handleMenu } = props;

  return (
    <>
      <div
        onClick={handleMenu}
        style={{ display: `${visible === undefined ? "none" : "block"}` }}
        className={`${styles.musk} ${classNames({
          [styles.muskOut]: !(visible ?? true),
          [styles.muskIn]: visible ?? false,
        })}`}
      />
      <aside
        ref={ref}
        className={`${styles.menuContainer} ${classNames({
          [styles.menuHidden]: !(visible ?? true),
          [styles.menuDisplay]: visible ?? false,
        })}`}
      >
        <div className={`${styles.menuHeader}`}>
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

export default Menu;

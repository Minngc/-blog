import {
  EntertainmentIcon,
  HomeIcon,
  BookIcon,
  PenIcon,
  DailyIcon,
  LinkIcon,
  HatIcon,
  BoxIcon,
  AngleIcon,
} from "@/Icon";
import styles from "./index.module.scss";
import { Children, ReactNode, useState } from "react";
import classNames from "classnames";

const MenuList = () => {
  return (
    <div className={`${styles.menuList}`}>
      <MenuRegularItem icon={<HomeIcon />} content="首页" />
      <MenuRegularItem icon={<BookIcon />} content="文章" />
      <MenuCollapseItem icon={<BoxIcon />} content="归档">
        <MenuRegularItem icon={<PenIcon />} content="学习" />
        <MenuRegularItem icon={<DailyIcon />} content="日常" />
        <MenuRegularItem icon={<EntertainmentIcon />} content="娱乐" />
      </MenuCollapseItem>
      <MenuRegularItem icon={<LinkIcon />} content="友链" />
      <MenuRegularItem icon={<HatIcon />} content="关于" />
    </div>
  );
};

const MenuRegularItem = (props: { icon: ReactNode; content: string }) => {
  const { icon, content } = props;
  return (
    <div tabIndex={0} className={styles.menuItem}>
      {icon}
      <span>{content}</span>
    </div>
  );
};

const MenuCollapseItem = (props: {
  icon: ReactNode;
  content: string;
  children: ReactNode;
}) => {
  const { icon, content, children } = props;

  const [fold, setFold] = useState<boolean>();
  return (
    <>
      <div
        tabIndex={0}
        className={styles.menuItem}
        onClick={() => {
          setFold(!(fold ?? false));
        }}
      >
        {icon}
        <span>{content}</span>
        <div
          className={`${styles.angleIcon} ${classNames({
            [styles.angleTurnLeft]: fold,
            [styles.angleTurnBottom]: !(fold ?? true),
          })}`}
        >
          <AngleIcon />
        </div>
      </div>
      <div
        tabIndex={0}
        className={`${styles.collapseContainer} ${classNames({
          [styles.collapseClose]: fold,
          [styles.collapseOpen]: !(fold ?? true),
        })} `}
      >
        {children}
      </div>
    </>
  );
};

export { MenuList };

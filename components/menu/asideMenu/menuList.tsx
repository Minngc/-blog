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
  ClockIcon,
} from "@/Icon";
import Link from "next/link";
import styles from "./index.module.scss";
import { ReactNode, useState } from "react";
import classNames from "classnames";

const MenuList = (props: { pathname: string }) => {
  return (
    <ul className={`${styles.menuList}`}>
      <MenuRegularItem href={"/home"} icon={<HomeIcon />} content="首页" />
      <MenuRegularItem href={"/article"} icon={<BookIcon />} content="文章" />
      <MenuCollapseItem
        icon={<BoxIcon />}
        content="归档"
        items={[
          ["/timeline", <ClockIcon key={"clock icon"} />, "时轴"],
          ["", <PenIcon key="pen icon" />, "学习"],
          ["", <DailyIcon key="daily icon" />, "日常"],
          ["", <EntertainmentIcon key="entertainment icon" />, "娱乐"],
        ]}
      />
      <MenuRegularItem href={"/link"} icon={<LinkIcon />} content="友链" />
      <MenuRegularItem href={"/about"} icon={<HatIcon />} content="关于" />
    </ul>
  );
};

const MenuRegularItem = (props: {
  href: string;
  icon: ReactNode;
  content: string;
}) => {
  const { href, icon, content } = props;
  return (
    <li tabIndex={0} className={styles.menuItem}>
      <Link href={href} className={styles.menuItemLink}>
        {icon}
        <span>{content}</span>
      </Link>
    </li>
  );
};

const MenuCollapseItem = (props: {
  icon: ReactNode;
  content: string;
  items: [href: string, icon: ReactNode, content: string][];
}) => {
  const { icon, content, items } = props;

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
          })}`}
        >
          <AngleIcon />
        </div>
      </div>
      <ul
        tabIndex={0}
        className={`${styles.collapseContainer} ${classNames({
          [styles.collapseClose]: fold,
        })} `}
      >
        {items.map((item) => {
          return (
            <MenuRegularItem
              key={`${item[0]}_${item[2]}`}
              href={item[0]}
              icon={item[1]}
              content={item[2]}
            />
          );
        })}
      </ul>
    </>
  );
};

export { MenuList };

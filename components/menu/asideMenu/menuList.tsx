import { AngleIcon } from "@/Icon";
import Link from "next/link";
import styles from "./index.module.scss";
import { memo, useContext, useState, useEffect } from "react";
import { PathContext } from "context";
import classNames from "classnames";
import {
  type MenuItemProps,
  type MenuCollapseItemProps,
  menuItems,
} from "../index";

const MenuList = () => {
  const path = useContext(PathContext);
  const [selectedList, setSlectedList] = useState(
    menuItems.map((value) => {
      return value.href === path[1];
    }),
  );
  useEffect(() => {
    setSlectedList(
      menuItems.map((value) => {
        return value.href === path[1];
      }),
    );
  }, [path]);
  return (
    <ul className={`${styles.menuList}`}>
      {menuItems.map((item, index) => {
        if (item.type === "Regular") {
          return (
            <MenuRegularItem
              key={`link_${item.href}`}
              href={item.href}
              icon={item.icon}
              content={item.content}
              selected={selectedList[index]}
            />
          );
        } else
          return (
            <MenuCollapseItem
              key={`link_${item.href}`}
              href={item.href}
              icon={item.icon}
              content={item.content}
              selected={selectedList[index]}
              items={item.items}
            />
          );
      })}
    </ul>
  );
};

const MenuRegularItem = memo(
  function MenuRegularItem(props: MenuItemProps) {
    const { href, icon, content, selected } = props;
    return (
      <li
        tabIndex={0}
        className={classNames([styles.menuItem], {
          [styles.selected]: selected,
        })}
      >
        <Link href={href} className={styles.menuItemLink}>
          {icon}
          <span>{content}</span>
        </Link>
      </li>
    );
  },
  (pre, next) => {
    return pre.selected === next.selected;
  },
);

const MenuCollapseItem = memo(
  function MenuCollapseItem(props: MenuCollapseItemProps) {
    const path = useContext(PathContext);
    const { href, icon, content, items, selected } = props;
    const [fold, setFold] = useState<boolean>();
    const [selectedList, setSeletedList] = useState(
      items.map((item) => {
        return selected && item.href === `${href}${path[2]}`;
      }),
    );
    useEffect(() => {
      setSeletedList(
        items.map((item) => {
          return selected && item.href === `${href}${path[2]}`;
        }),
      );
    }, [items, path, selected, href]);
    return (
      <>
        <li
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
        </li>
        <ul
          tabIndex={0}
          style={{ "--item-num": items.length }}
          className={`${styles.collapseContainer} ${classNames({
            [styles.collapseClose]: fold,
          })} `}
        >
          {items.map((item, index) => {
            return (
              <MenuRegularItem
                key={`link_${item.href}`}
                href={item.href}
                icon={item.icon}
                content={item.content}
                selected={selectedList[index]}
              />
            );
          })}
        </ul>
      </>
    );
  },
  (pre, next) => {
    return pre.selected === next.selected;
  },
);

export { MenuList };

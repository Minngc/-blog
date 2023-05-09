import classNames from "classnames";
import Link from "next/link";
import { memo, useContext, useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import { TriangleIcon } from "@/Icon";
import {
  type MenuItemProps,
  type MenuCollapseItemProps,
  menuItems,
} from "../index";
import { PathContext } from "context";

const MenuList = () => {
  const pathArray = useContext(PathContext);
  const [selectedList, setSelectedList] = useState(
    menuItems.map((item) => {
      return item.href === pathArray[1];
    }),
  );
  useEffect(() => {
    setSelectedList(
      menuItems.map((item) => {
        return item.href === pathArray[1];
      }),
    );
  }, [pathArray]);
  return (
    <>
      <ul className={classNames([styles.menuNavUl])}>
        {menuItems.map((item, index) => {
          if (item.type === "Regular")
            return (
              <MenuItem
                icon={item.icon}
                href={item.href}
                content={item.content}
                selected={selectedList[index]}
              />
            );
          else
            return (
              <MenuCollapseItem
                items={item.items}
                icon={item.icon}
                href={item.href}
                content={item.content}
                selected={item.selected}
              />
            );
        })}
      </ul>
    </>
  );
};

const MenuItem = memo(
  function MenuItem(props: MenuItemProps) {
    const {
      icon,
      content,
      href,
      selected,
      clearDefault = false,
      className = "",
    } = props;
    return (
      <li
        className={classNames([className], {
          [styles.menuNavLi]: !clearDefault,
        })}
      >
        <Link
          href={href}
          className={classNames({ [styles.selected]: selected })}
        >
          {icon}
          {content}
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
    const interTimer = useRef<NodeJS.Timer>();
    const [fold, setFold] = useState<boolean>(true);
    const pathArray = useContext(PathContext);
    const { href, className, icon, content, items } = props;
    const [selectedList, setSelectedList] = useState<boolean[]>(
      items.map((item) => item.href === `${href}${pathArray[2]}`),
    );
    useEffect(() => {
      setSelectedList(
        items.map((item) => item.href === `${href}${pathArray[2]}`),
      );
    }, [pathArray, href, items]);
    return (
      <li
        className={classNames([styles.menuNavLi], [className], {
          [styles.foldTest]: !fold,
        })}
        onMouseEnter={() => {
          if (interTimer.current) clearTimeout(interTimer.current);
          interTimer.current = setTimeout(() => {
            setFold(false);
          }, 100);
        }}
        onMouseLeave={() => {
          if (interTimer)
            if (interTimer.current) clearTimeout(interTimer.current);
          interTimer.current = setTimeout(() => {
            setFold(true);
          }, 100);
        }}
      >
        {icon}
        {content}
        <div
          className={classNames([styles.Panel], {
            [styles.PanelOut]: fold ?? true,
          })}
        >
          <div className={classNames([styles.triangleBox])}>
            <TriangleIcon />
          </div>
          <ul className={classNames([styles.collaspe])}>
            {items.map((item, index) => {
              return (
                <MenuItem
                  key={`link_${item.href}`}
                  href={item.href}
                  icon={item.icon}
                  content={item.content}
                  selected={selectedList[index]}
                  className={classNames([styles.collapseItem])}
                  clearDefault
                />
              );
            })}
          </ul>
        </div>
      </li>
    );
  },
  (pre, next) => {
    return pre.selected === next.selected;
  },
);

export { MenuList, MenuItem, MenuCollapseItem };

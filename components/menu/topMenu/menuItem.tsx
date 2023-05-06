import classNames from "classnames";
import { ReactNode, useState } from "react";
import styles from "./index.module.scss";
import { TriangleIcon } from "@/Icon";

interface MenuItem {}

const MenuItem = (props: {
  icon: ReactNode;
  content: string;
  clearDefault?: boolean;
}) => {
  const { icon, content, clearDefault: clearClass = false } = props;
  return (
    <li className={classNames({ [styles.menuNavLi]: !clearClass })}>
      {icon}
      {content}
    </li>
  );
};

const MenuCollapseItem = (props: {
  icon: ReactNode;
  content: string;
  items: [ReactNode, string][];
}) => {
  const [fold, setFold] = useState<boolean>(true);
  const { icon, content, items } = props;
  return (
    <li
      className={classNames([styles.menuNavLi], {
        [styles.foldTest]: !fold,
      })}
      onMouseEnter={() => {
        setFold(false);
        console.log(fold);
      }}
      onMouseLeave={() => {
        setFold(true);
        console.log(fold);
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
          {items.map((item) => {
            return (
              <MenuItem
                key={item[1]}
                icon={item[0]}
                content={item[1]}
                clearDefault
              />
            );
          })}
        </ul>
      </div>
    </li>
  );
};

export { MenuItem, MenuCollapseItem };

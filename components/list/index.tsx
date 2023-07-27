import classNames from "classnames";
import { MouseEventHandler } from "react";
import styles from "./index.module.scss";

interface IndexWithChildren {
  type: "haslist";
  href: string;
  value: string;
  children: { href: string; value: string }[];
}

interface IndexWithoutChildren {
  type: "nolist";
  href: string;
  value: string;
}

type Index = (IndexWithChildren | IndexWithoutChildren) & {
  onClick: MouseEventHandler;
  selected: boolean;
  index: number;
};

const IndexList = (props: Index) => {
  const { selected, index, type, href, value, onClick } = props;
  return (
    <>
      <li className={classNames(styles.item)} onClick={onClick}>
        <a
          className={classNames({ [styles.selected]: selected }, styles.anchor)}
          href={href}
        >
          {index + 1}.{value}
        </a>
        {selected && type === "haslist" && (
          <ul>
            {props.children.map((value: any) => {
              return (
                <li className={classNames(styles.item)} key={`h3_${value.href}`}>
                  <a className={styles.anchor} href={value.href}>
                    {value.value}
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </li>
    </>
  );
};

export { IndexList };

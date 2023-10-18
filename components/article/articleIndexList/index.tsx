import classNames from "classnames";
import { MouseEventHandler } from "react";
import styles from "./index.module.scss";

interface IndexWithChildren {
  type: "haslist";
  h2_index: string;
  href: string;
  value: string;
  children: { h3_index: string; href: string; value: string }[];
}

interface IndexWithoutChildren {
  type: "nolist";
  h2_index: string;
  href: string;
  value: string;
}

type Index = (IndexWithChildren | IndexWithoutChildren) & {
  onClick: MouseEventHandler;
  selected: boolean;
};

const IndexList = (props: Index) => {
  const { selected, h2_index, type, href, value, onClick } = props;
  return (
    <>
      <li className={classNames(styles.item)} onClick={onClick}>
        <a
          className={classNames({ [styles.selected]: selected }, styles.anchor)}
          href={href}
        >
          <span className={styles.toc_index}>{h2_index}</span> {value}
        </a>
        {selected && type === "haslist" && (
          <ul className={classNames(styles.h3_ulist)}>
            {props.children.map((value: any) => {
              return (
                <li
                  className={classNames(styles.h3_item)}
                  key={`h3_${value.href}`}
                >
                  <a className={styles.anchor} href={value.href}>
                    <span className={styles.toc_index}>{value.h3_index}</span>
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

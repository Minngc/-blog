"use client";

import classNames from "classnames";
import styles from "./index.module.scss";
import { MDXRemote } from "next-mdx-remote";

const InfoLlist = (props: {
  data: { title: string; content: any; key: string }[];
}) => {
  return (
    <>
      {props.data.map((value) => {
        return (
          <div key={value.key} className={classNames(styles.container)}>
            <div className={classNames(styles.infoContainer)}>
              <div className={classNames(styles.title)}>{value.title}</div>
              <div className={classNames(styles.info)}>
                <MDXRemote {...value.content} />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export { InfoLlist };

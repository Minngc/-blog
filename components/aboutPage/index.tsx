"use client";

import classNames from "classnames";
import styles from "./index.module.scss";
import { MDXRemote } from "next-mdx-remote";
import { articleReplaceComponents } from "../article/articleReplaceComponents";

const InfoItem = (props: { title: string; content: any }) => {
  return (
    <div className={classNames(styles.container)}>
      <div className={classNames(styles.title)}>{props.title}</div>
      <div className={classNames(styles.info)}>
        <MDXRemote {...props.content} components={articleReplaceComponents} />
      </div>
    </div>
  );
};

export { InfoItem };

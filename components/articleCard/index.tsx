import { Tag } from "../Anchor";
import classNames from "classnames";
import styles from "./index.module.scss";
import Link from "next/link";
import { Line } from "../line";

const ArticleCard = (props: any) => {
  const { href, tagList, author, date, title, description } = props;
  return (
    <div className={classNames(styles.container)}>
      <div className={classNames(styles.header)}>
        <div className={classNames(styles.articleTitle)}>这里是标题</div>
        <div className={classNames(styles.date)}>2023/06/04</div>
      </div>

      <div className={classNames(styles.mainContent)}>
        <div className={classNames(styles.author)}>Ming</div>
        <div className={classNames(styles.description)}>
          这里是文章的
          Description，他可能会很长，但是这里最多只能显示三行但是这里最多只
          能显示三行但是这里最多只能显示三行但是这里最多只能显示三行但是这
          里最多只能显示三行 能显示三行但是这里最多只能显示三行但是这里最多只能显示三行但是这
          里最多只能显示三行 能显示三行但是这里最多只能显示三行但是这里最多只能显示三行但是这
          里最多只能显示三行
        </div>
      </div>
      <div className={classNames(styles.footer)}>
        <div className={styles.tagList}>
          <Tag query="tag1" />
          <Tag query="tag1" />
          <Tag query="tag1" />
        </div>
        <div className={styles.link}>
          <Link href={"./"}>{"查看全文 ＞"}</Link>
        </div>
      </div>

      <Line marginTop="2px" />
    </div>
  );
};

export { ArticleCard };

import Link from "next/link";
import bg from "@public/bg.jpg"
import { Tag } from "../anchor";
import classNames from "classnames";
import styles from "./index.module.scss";
import { Line } from "../line";
import Image from "next/image";

const ArticleCard = (props: any) => {
  const { className, href, tagList, author, date, title, description } = props;
  return (
    <div className={classNames(styles.container,className)}>
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
          里最多只能显示三行
          能显示三行但是这里最多只能显示三行但是这里最多只能显示三行但是这
          里最多只能显示三行
          能显示三行但是这里最多只能显示三行但是这里最多只能显示三行但是这
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

const ArticleCardWithImage = () => {
  return (
    <div className={classNames(styles.container_withImage)}>
      <div className={classNames(styles.image)}>
        <Image objectFit='cover' src={bg} alt={"bg"} width={300} height={200} />
      </div>
      <ArticleCard className={classNames(styles.articleContainer)}/>
    </div>
  );
};

export { ArticleCard, ArticleCardWithImage };

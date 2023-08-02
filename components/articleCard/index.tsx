import Link from "next/link";
import bg from "@public/bg.jpg";
import { Tag } from "../anchor";
import classNames from "classnames";
import styles from "./index.module.scss";
import { Line } from "../line";
import Image from "next/image";

interface ArticleMatterType {
  author: string;
  cover?: string;
  date: string;
  description: string;
  link: string;
  tag: string[];
  title: string;
}

interface ArticleProps {
  year: string;
  month: string;
  data: ArticleMatterType;
}

const ArticleCard = (
  props: ArticleProps & { className?: string; replace?: boolean }
) => {
  const {
    className = "",
    replace = false,
    year,
    month,
    data: { link, tag, author, date, title, description },
  } = props;
  return (
    <div className={classNames(styles.container, className)}>
      <div className={classNames(styles.header)}>
        <div className={classNames(styles.articleTitle)}>{title}</div>
        <div className={classNames(styles.date)}>{date}</div>
      </div>

      <div className={classNames(styles.mainContent)}>
        <div className={classNames(styles.author)}>{author}</div>
        <div className={classNames(styles.description)}>{description}</div>
      </div>
      <div className={classNames(styles.footer)}>
        <div className={styles.tagList}>
          <Tag replace={replace} tag={tag} />
        </div>
        <div className={styles.link}>
          <Link href={`/article/${year}/${month}/${link}`}>
            {"查看全文 ＞"}
          </Link>
        </div>
      </div>
    </div>
  );
};

const ArticleCardWithImage = (props: ArticleProps & { replace?: boolean }) => {
  return (
    <div className={classNames(styles.container_withImage)}>
      <div className={classNames(styles.image)}>
        <Image objectFit="cover" src={bg} alt={"bg"} width={300} height={200} />
      </div>
      <ArticleCard
        {...props}
        replace={props.replace}
        className={classNames(styles.articleContainer)}
      />
    </div>
  );
};

export { ArticleCard, ArticleCardWithImage };

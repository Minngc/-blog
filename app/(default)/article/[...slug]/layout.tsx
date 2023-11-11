import classNames from "classnames";
import { ReactNode } from "react";
import styles from "./page.module.scss";
import { generateArticleData } from "@/util/func/dataGenerate";
import { ArticleHeader } from "@/components/article/articleHeader";

type ArticlePath = [year: string, month: string, title: string];

const ArticleLayout = async (props: {
  children: ReactNode;
  index: ReactNode;
  params: { slug: ArticlePath };
}) => {
  const {
    children,
    params: { slug },
    index,
  } = props;

  const {
    frontmatter: { title, author, date, description, cover },
  } = await generateArticleData(slug[2]);
  return (
    <>
      <ArticleHeader title={title} author={author} date={date} cover={cover} />
      <main className={classNames(styles.container)}>
        <article className={classNames(styles.article)}>
          {description && (
            <blockquote className={"article-ele-blockquote"}>
              <p className="article-ele-p">{description}</p>
            </blockquote>
          )}
          {children}
        </article>
        <aside className={classNames(styles.index)}>{index}</aside>
      </main>
    </>
  );
};



export default ArticleLayout;

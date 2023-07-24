import { Search } from "@/components/search";
import { ArticleCardWithImage } from "@/components/articleCard";
import styles from "./page.module.scss";
import classNames from "classnames";
import articles from "@/config/articles.json";

const Post = () => {
  return (
    <>
      <Search />
      <div className={classNames(styles.articleList)}>
        {articles.map(({ year, month, fileName, data }) => {
          return (
            <ArticleCardWithImage
              year={year}
              month={month}
              data={data}
              key={`article_${year}_${month}_${fileName}`}
            />
          );
        })}
      </div>
    </>
  );
};

export default Post;

import { Search } from "@/components/search";
import { ArticleCardWithImage } from "@/components/articleCard";
import styles from "./page.module.scss";
import classNames from "classnames";

const Post = () => {
  return (
    <>
      <Search />
      <div className={classNames(styles.articleList)}>
        <ArticleCardWithImage/>
        <ArticleCardWithImage/>
        <ArticleCardWithImage/>
        <ArticleCardWithImage/>
        <ArticleCardWithImage/>
        <ArticleCardWithImage/>
        <ArticleCardWithImage/>
        <ArticleCardWithImage/>
        <ArticleCardWithImage/>
      </div>
    </>
  );
};

export default Post;

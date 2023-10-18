"use client";

import { Search } from "@/components/search";
import { ArticleCardWithImage } from "@/components/article/articleCard";
import styles from "./page.module.scss";
import classNames from "classnames";
import articles from "@/external/config/articles.json";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import tagList from "@/external//config/tagList.json";
import { searchParamsFilterFunc } from "@/lib/func";

const Post = () => {
  const searchParams =
    useSearchParams() ?? new ReadonlyURLSearchParams(new URLSearchParams());

  const searchClass = searchParams.get("class");
  const searchTag = searchParams.get("tag");
  const pub = searchParams.get("pub");
  const searchYear = searchParams.get("year");
  const searchTitle = searchParams.get("title");

  const searchData = { searchClass, searchYear, searchTitle, pub, searchTag };
  const filterArticles = searchParamsFilterFunc(articles, searchData);
  const filterData = { years: tagList.years, classes: tagList.classes };
  return (
    <>
      <Search
        searchData={{ searchClass, searchTitle, searchYear }}
        filterData={filterData}
      />
      <div className={classNames(styles.articleList)}>
        {filterArticles.map(({ year, month, fileName, data }) => {
          return (
            <ArticleCardWithImage
              replace
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

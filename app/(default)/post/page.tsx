"use client";

import { Search } from "@/components/search";
import { ArticleCardWithImage } from "@/components/articleCard";
import styles from "./page.module.scss";
import classNames from "classnames";
import articles from "@/config/articles.json";
import { useSearchParams } from "next/navigation";
import tagList from "@/config/tagList.json";

const Post = () => {
  const searchParams = useSearchParams();

  const searchClass = searchParams.get("class");
  const searchTag = searchParams.get("tag");
  const pub = searchParams.get("pub");
  const searchYear = searchParams.get("year");
  const searchTitle = searchParams.get("title");

  const searchData = { searchClass, searchYear, searchTitle, pub, searchTag };
  function filterFunc(searchData: {
    searchClass: null | string;
    searchTag: null | string;
    pub: null | string;
    searchYear: null | string;
    searchTitle: null | string;
  }) {
    const reg =
      searchTitle !== null
        ? new RegExp(searchTitle.split("").join(".*"), "g")
        : /.*/g;
    return articles.filter(({ year, data: { title, tag } }) => {
      return (
        (!searchClass || searchClass === tag[0]) &&
        (!searchTag || searchTag === tag[1]) &&
        (!pub || pub === tag[2]) &&
        (!searchYear || searchYear === year) &&
        (!searchTitle || reg.test(title))
      );
    });
  }
  const filterArticles = filterFunc(searchData);
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

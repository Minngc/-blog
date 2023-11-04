export function searchParamsFilterFunc(
  articles: any[],
  searchData: {
    searchClass: null | string;
    searchTag: null | string;
    pub: null | string;
    searchYear: null | string;
    searchTitle: null | string;
  }
) {
  const reg =
    searchData.searchTitle !== null
      ? new RegExp(searchData.searchTitle.split("").join(".*"), "g")
      : /.*/g;
  return articles.filter(({ year, data: { title, tag } }) => {
    return (
      (!searchData.searchClass || searchData.searchClass === tag[0]) &&
      (!searchData.searchTag || searchData.searchTag === tag[1]) &&
      (!searchData.pub || searchData.pub === tag[2]) &&
      (!searchData.searchYear || searchData.searchYear === year) &&
      (!searchData.searchTitle || reg.test(title))
    );
  });
}

import dateReplace from "external/config/article-replace/date.json";
export function datetrans(source: string, year: boolean = true) {
  const date = source.split("/");
  date[0] = (dateReplace as any)[date[0]];
  return year
    ? date[0] + " " + date[1] + ", " + date[2]
    : date[0] + " " + date[1];
}

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

import dateReplace from "../../external/config/article-replace/date.json" assert { type: "json" };
export function datetrans(source: string, year: boolean = true) {
  const date = source.split(/[/-]/g);
  if (/[\d]{4}[/-][\d]{2}[/-][\d]{2}$/g.test(source)) {
    date[1] = (dateReplace as any)[date[1]];
    return year
      ? date[1] + " " + date[2] + ", " + date[0]
      : date[1] + " " + date[2];
  }
  date[0] = (dateReplace as any)[date[0]];
  return year
    ? date[0] + " " + date[1] + ", " + date[2]
    : date[0] + " " + date[1];
}

import basicInfo from "../../external/config/pages-config/basic.json" assert { type: "json" };

export function generateCover(
  cover: [string | undefined, string | undefined] | undefined | string
) {
  if (cover === undefined) {
    return [basicInfo.cover, basicInfo.darkCover];
  }
  if (typeof cover === "string") {
    return [cover, basicInfo.darkCover];
  }
  return [cover[0] ?? basicInfo.cover, cover[1] ?? basicInfo.darkCover];
}

import tagTrans from "../../external/config/article-replace/tagTrans.json" assert { type: "json" };

export function generateTag(originTag: [string, string, string]) {
  const tagtrans = tagTrans as {
    classes: { [key: string]: string };
    tags: { [key: string]: string };
    pub: { [key: string]: string };
  };
  return [
    tagtrans.classes[originTag[0]] ?? originTag[0],
    tagtrans.tags[originTag[1]] ?? originTag[1],
    tagtrans.tags[originTag[2]] ?? originTag[2],
  ];
}
export function generateDescription(origin: string | undefined) {
  if (origin === undefined || origin === "")
    return basicInfo.defaultDescription;
  return origin;
}

import fs from "node:fs";
import matter from "gray-matter";
import tagTrans from "./external/config/article-replace/tagTrans.json"  assert { type: "json" };
import basicInfo from "./external/config/pages-config/basic.json"  assert { type: "json" };
import { generateCover,generateTag,datetrans, generateDescription} from "./util/func/index.ts";

console.log("--- on running ---");

function genarateArticle() {
  // 获取年份目录
  let yearDir: string[] = [];
  fs.readdirSync("./external/post").forEach((year) => {
    yearDir.push(year);
  });

  // 获取月份目录
  let monthDir: { year: string; month: string }[] = [];
  yearDir.forEach((year) => {
    fs.readdirSync(`./external/post/${year}`).forEach((month) => {
      monthDir.push({ year, month });
    });
  });

  // 组合获取文件目录
  let fileDir: { year: string; month: string; fileName: string }[] = [];
  monthDir.forEach((path) => {
    fs.readdirSync(`./external/post/${path.year}/${path.month}`).forEach(
      (fileName) => {
        fileDir.push({
          year: path.year,
          month: path.month,
          fileName: fileName,
        });
      }
    );
  });

  // list 用于存储文章信息
  const list: {
    year: string;
    month: string;
    fileName: string;
    data: {
      date: string;
      tag: string[];
      title: string;
      author: string;
      cover: string[];
      description: string;
      link: string;
    };
  }[] = [];
  const articleNames: { [key: string]: string } = {};
  const tagList: { [key: string]: any[] } = {
    study: [],
    record: [],
    guide: [],
    day: [],
    others: [],
  };
  const listOrderByYear: { [key: string]: any[] } = {};

  yearDir.forEach((year) => {
    listOrderByYear[year] = [];
  });
  fileDir.forEach(({ year, month, fileName }) => {
    const { data } = matter(
      fs.readFileSync(`./external/post/${year}/${month}/${fileName}`, "utf-8")
    );

    articleNames[
      `${data.Link}`
    ] = `./external/post/${year}/${month}/${fileName}`;
    fs.writeFileSync(
      "./external/config/articleNames.json",
      JSON.stringify(articleNames, null, 2) + "\n",
      {
        flag: "w",
      }
    );

    if (tagList[`${data.Tag[0]}`]) {
      tagList[`${data.Tag[0]}`].push(data.Tag[1]);
    } else {
      tagList[`${data.Tag[0]}`] = [];
      tagList[`${data.Tag[0]}`].push(data.Tag[1]);
    }
    //  用于生成根据时间排序的文章列表
    listOrderByYear[year].push({
      year,
      month,
      title: data.Title,
      date: datetrans(data.Date, false),
      link: data.Link,
    });
    // 文章汇总
    list.push({
      year,
      month,
      fileName,
      data: {
        author: data.Author ?? basicInfo.author,
        date: datetrans(data.Date),
        title: data.Title,
        link: data.Link,
        tag: data.Tag,
        description: generateDescription(data.Description),
        cover: generateCover(data.Cover),
      },
    });
    fs.writeFileSync(
      "./external/config/articles.json",
      JSON.stringify(list, null, 2) + "\n",
      {
        flag: "w",
      }
    );
  });

  // 用于生成 tag 列表，用于侧边栏展示
  const trans = tagTrans as {
    classes: { [key: string]: string };
    tags: { [key: string]: string };
    pub: { [key: string]: string };
  };

  Object.keys(tagList).forEach((key) => {
    tagList[key] = [...new Set(tagList[key])];
  });
  const years = yearDir.map((year) => {
    return {
      link: year,
      title: year,
    };
  });
  const classes: { link: string; title: string }[] = [];
  const tagsWidthClass = Object.keys(tagList).map((key) => {
    const list = tagList[key].map((tag) => {
      return {
        link: tag,
        title: trans.tags[tag] ?? tag,
      };
    });
    classes.push({
      link: key,
      title: trans.classes[key] ?? key,
    });
    return {
      link: key,
      title: trans.classes[key] ?? key,
      list,
    };
  });

  const tags = { years, classes, tagsWidthClass };
  fs.writeFileSync(
    "./external/config/tagList.json",
    JSON.stringify(tags, null, 2) + "\n",
    {
      flag: "w",
    }
  );
  Object.keys(listOrderByYear).forEach((year) => {
    listOrderByYear[year].sort((a, b) => {
      if (b.month === a.month)
        return Number(b.date.slice("/")[1]) - Number(a.date.slice("/")[1]);
      return Number(b.month) - Number(a.month);
    });
  });
  fs.writeFileSync(
    "./external/config/listOrderByYear.json",
    JSON.stringify(listOrderByYear, null, 2) + "\n",
    {
      flag: "w",
    }
  );
}


genarateArticle();

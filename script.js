import fs from "node:fs";
import matter from "gray-matter";
// import article from "./config/articleNames.json"

console.log("--- on running ---");

function genarateArticle() {
  // 年份目录
  let yearDir = [];
  fs.readdirSync("./external/post").forEach((year) => {
    yearDir.push(year);
  });

  // 月份目录
  let monthDir = [];
  yearDir.forEach((year) => {
    fs.readdirSync(`./external/post/${year}`).forEach((month) => {
      monthDir.push({ year, month });
    });
  });

  let fileDir = [];
  monthDir.forEach((path) => {
    fs.readdirSync(`./external/post/${path.year}/${path.month}`).forEach((fileName) => {
      fileDir.push({
        year: path.year,
        month: path.month,
        fileName: fileName,
      });
    });
  });

  const list = [];
  const articleNames = {};
  const tagList = {
    study: [],
    record: [],
    guide: [],
    day: [],
    others: [],
  };
  const listOrderByYear = {};

  yearDir.forEach((year) => {
    listOrderByYear[year] = [];
  });
  fileDir.forEach(({ year, month, fileName }) => {
    const { data } = matter(
      fs.readFileSync(`./external/post/${year}/${month}/${fileName}`, "utf-8")
    );

    articleNames[`${data.Link}`] = `./external/post/${year}/${month}/${fileName}`;
    fs.writeFileSync(
      "./external/config/articleNames.json",
      JSON.stringify(articleNames),
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

    listOrderByYear[year].push({
      year,
      month,
      title: data.Title,
      date: data.Date,
      link: data.Link,
    });

    list.push({
      year,
      month,
      fileName,
      data: {
        author: data.Author,
        date: data.Date,
        title: data.Title,
        link: data.Link,
        tag: data.Tag,
        description: data.Description,
        cover: data.Cover,
      },
    });
    fs.writeFileSync("./external/config/articles.json", JSON.stringify(list), {
      flag: "w",
    });
  });
  const trans = JSON.parse(fs.readFileSync("./external/config/tagTrans.json"));

  Object.keys(tagList).forEach((key) => {
    tagList[key] = [...new Set(tagList[key])];
  });
  const years = yearDir.map((year) => {
    return {
      link: year,
      title: year,
    };
  });
  const classes = [];
  const tagsWidthClass = Object.keys(tagList).map((key) => {
    const list = tagList[key].map((tag) => {
      return {
        link: tag,
        title: trans.tags[tag] ? trans.tags[tag] : tag,
      };
    });
    classes.push({
      link: key,
      title: trans.classes[key] ? trans.classes[key] : key,
    });
    return {
      link: key,
      title: trans.classes[key] ? trans.classes[key] : key,
      list,
    };
  });

  const tags = { years, classes, tagsWidthClass };
  fs.writeFileSync("./external/config/tagList.json", JSON.stringify(tags), {
    flag: "w",
  });
  Object.keys(listOrderByYear).forEach((year) => {
    listOrderByYear[year].sort((a, b) => {
      if (b.month === a.month)
        return Number(b.date.slice("/")[1]) - Number(a.date.slice("/")[1]);
      return Number(b.month) - Number(a.month);
    });
  });
  fs.writeFileSync(
    "./external/config/listOrderByYear.json",
    JSON.stringify(listOrderByYear),
    {
      flag: "w",
    }
  );
}

genarateArticle();

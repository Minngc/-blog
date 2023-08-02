import fs from "node:fs";
import matter from "gray-matter";
// import article from "./config/articleNames.json"

console.log("--- on running ---");

function genarateArticle() {
  // 年份目录
  let yearDir = [];
  fs.readdirSync("./post").forEach((year) => {
    yearDir.push(year);
  });

  // 月份目录
  let monthDir = [];
  yearDir.forEach((year) => {
    fs.readdirSync(`./post/${year}`).forEach((month) => {
      monthDir.push({ year, month });
    });
  });

  let fileDir = [];
  monthDir.forEach((path) => {
    fs.readdirSync(`./post/${path.year}/${path.month}`).forEach((fileName) => {
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

  fileDir.forEach(({ year, month, fileName }) => {
    const { data } = matter(
      fs.readFileSync(`./post/${year}/${month}/${fileName}`, "utf-8")
    );

    articleNames[`${data.Link}`] = `./post/${year}/${month}/${fileName}`;
    fs.writeFileSync(
      "./config/articleNames.json",
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
    fs.writeFileSync("./config/articles.json", JSON.stringify(list), {
      flag: "w",
    });
  });
  const trans = JSON.parse(fs.readFileSync("./config/tagTrans.json"));

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
  fs.writeFileSync("./config/tagList.json", JSON.stringify(tags), {
    flag: "w",
  });
}

genarateArticle();

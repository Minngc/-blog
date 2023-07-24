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
}

genarateArticle();

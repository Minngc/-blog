import articles from "@json/articles.json";
import Link from "next/link";
import fs from "node:fs";
// import { getMatter } from "lib/getPostFiles";

import { getMdFiles } from "lib/getPostFiles";

const Article: React.FC = ({}) => {
  return <>这个页面不知道要放什么</>;
};

export async function getStaticProps() {
  // const sortedList = await getMatter();
  const b = getMdFiles("./post");
  return {
    props: {
      articleList: [],
    },
  };
}

export default Article;

// function getMdFiles(last: string, now: string): any {
//   if (!/^([^\\:*<>|"?\r\n/\\.]+)$/i.test(now))
//     if (/[\w]*\.md[x]?/i.test(now)) return last + now;
//     else throw new Error("非法的文件");
//   last = last + now + "/";
//   const b = fs.readdirSync(last);
//   // console.log(b)
//   return b.map((value) => {
//     return getMdFiles(last, value);
//   });
// }

// function getfile(last: string, now: string): any {
//   if (!/^([^\\:*<>|"?\r\n/\\.]+)$/i.test(now)) return last + now;
//   last = last + now + "/";
//   const b = fs.readdirSync(last);
//   // console.log(b)
//   return b.map((value) => {
//     return getfile(last, value);
//   });
// }

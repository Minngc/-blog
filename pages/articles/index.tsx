import TopNav from "@/Layout/TopNav";
import articles from "@json/articles.json";
import Link from "next/link";
import fs from "node:fs";
// import { getMatter } from "lib/getPostFiles";

import { getMdFiles } from "lib/getPostFiles";

import type { MatterDateType3 } from "@type/index";

const Article: React.FC<{ articleList: MatterDateType3[] }> = ({
  articleList,
}) => {
  return (
    <>
      This is an Article page
      <ol>
        {articleList.map((value) => {
          return (
            <li key={value.Title}>
              <Link
                href={
                  "articles/" +
                  value.Date[0] +
                  "/" +
                  value.Date[1] +
                  "/" +
                  value.Link
                }
              >
                {value.Title}
              </Link>
            </li>
          );
        })}
      </ol>
    </>
  );
};

export async function getStaticProps() {
  // const sortedList = await getMatter();
  const b = getMdFiles("./post");
  console.log(b);
  return {
    props: {
      articleList: [],
    },
  };
}

const defult = [
  [],
  [
    [
      "./post/2023/03/build-develop-environment.mdx/",
      "./post/2023/03/test.mdx/",
      "./post/2023/03/test2.md/",
    ],
    [],
  ],
  "./post/test1.tsx/",
];

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

import { GetStaticProps } from "next";
import fs, { readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { MatterDateType, MatterDateType3 } from "@type/index";

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

interface DirType {
  cfd: string[];
  dir: string[] | [];
  file: string[] | [];
}

interface FullFileNameType {
  cfd: string[];
  file: string;
  extends: string;
}

interface YearFileNameType {
  month: string;
  file: string;
  extends: string;
}

interface MatterType {
  Id: number;
  Author: string;
  Date: string;
  Tag: string;
  Title: string;
  Link: string;
}

/**
 * 获取发布文章的顶级目录下的文件夹
 * @param dirName 顶级目录名
 * @returns
 */
function getDirs(dirName: string): DirType {
  const dirs: string[] = [],
    files: string[] = [];
  fs.readdirSync(dirName).forEach((value) => {
    // 判断是否为目录
    if (/^[^\\:*<>|"?\r\n/\\.]+$/i.test(value)) dirs.push(value);
    else if (/[\w]*\.md[x]?/i.test(value)) files.push(value);
  });
  return {
    cfd: dirName.split("/"),
    dir: dirs,
    file: files,
  };
}

/**
 * 获取发布文章下的顶级目录下的文件夹的文件夹
 * @param dirName 顶级目录
 * @returns
 */
function getSecondDir(dirName: string): DirType[] {
  const firstDir: string[] | [] = getDirs(dirName).dir;
  return firstDir.map((value) => {
    const fullDir = `${dirName}/${value}`;
    return getDirs(fullDir);
  });
}

/**
 * 获取该年所有的文章
 * @param year 年份
 * @returns
 */
function getMdByYear(year: string) {
  if (!fs.readdirSync("./post").includes(year)) return false;

  const dir: string[] = [];
  fs.readdirSync(`./post/${year}`).forEach((value) => {
    if (/^[^\\:*<>|"?\r\n/\\.]+$/i.test(value)) {
      dir.push(value);
    }
  });
  const files: YearFileNameType[] = [];
  dir.map((value) => {
    fs.readdirSync(`./post/${year}/${value}`).forEach((value2) => {
      files.push({
        month: value,
        file: `${value2}`.replace(/\.md[x]?$/i, ""),
        extends: `${value2}`.replace(/^[^\\:*<>|"?\r\n/\\.]+/i, ""),
      });
    });
  });
}

/**
 * 获取发布的 Md 文件
 * @param dirName 顶级目录名
 * @returns
 */
function getMdFiles(dirName: string): FullFileNameType[] {
  // 一个包含许多对象的数组
  const fileList: FullFileNameType[] = [];
  const dirArr = getSecondDir(dirName);
  dirArr.forEach((value) => {
    const preDir = value.cfd.join("/");
    value.dir.forEach((value2) => {
      fs.readdirSync(`${preDir}/${value2}`).forEach((value3) => {
        if (/[\w]*\.md[x]?/i.test(value3))
          fileList.push({
            cfd: `${preDir}/${value2}`.split("/"),
            file: `${value3}`.replace(/\.md[x]?$/i, ""),
            extends: `${value3}`.replace(/^[^\\:*<>|"?\r\n/\\.]+/i, ""),
          });
      });
    });
  });
  return fileList;
}

function getFullFileName(dirName: string) {
  return getMdFiles(dirName).map((value) => {
    return `${value.cfd.join("/")}/${value.file}${value.extends}`;
  });
}

/**
 * 返回 Md 文件顶部的标注
 * @returns
 */
function getAllMatter() {
  return getMdFiles("./post")
    .map((value) => {
      return [
        `${value.cfd.join("/")}/${value.file}${value.extends}`,
        `${value.cfd.join("/")}/${value.file}`,
      ] as [string, string];
    })
    .map((fileName) => {
      const FileContent = fs.readFileSync(fileName[0], "utf8");
      const { data } = matter(FileContent);
      return { links: fileName[1], ...(data as MatterType) };
    });
}

// // 获取发布文章的名字和标题
// const getPostFileNames = async () => {
//   // 获取发布的文章文件
//   // console.log(fs.readdirSync("./"));
//   const postFiles = fs
//     .readdirSync("./post/")
//     .filter((value) => {
//       return (
//         // 是否应该允许不规范的文件
//         /[\w]*\.md[x]?/i.test(value) || /^[^\\:*<>|"?\r\n/\\.]+$/i.test(value)
//       );
//     })
//     .map((value) => {
//       return;
//     });

//   // const postFiles = fs.readdirSync("./article/").filter((value) => {
//   //   return /[\w]*\.md[x]?/i.test(value);
//   // });
//   // 获取文件全路径 与 文件的名字(不含扩展名)
//   // const postNames: [string, string][] = postFiles.map((value) => {
//   //   return [path.join("./article/", value), value.replace(/.md[x]?/i, "")];
//   // });

//   //
//   return postNames;
// };

// const getMatter = async () => {
//   const fileNames = (await getMdFiles("./", "post")) as (
//     | (string[] | [])[]
//     | []
//   )[];
//   fileNames.map((value) => {
//     if (JSON.stringify(value) !== "[]") value.map();
//   });
// };

// // 获取标题信息
// const getMatter = async () => {
//   const postNames = await getPostFileNames();
//   //
//   const content = postNames.map((value) => {
//     // console.log(value[0]);
//     const filecontent = fs.readFileSync(value[0], "utf-8");
//     const { data } = matter(filecontent);
//     const transData: MatterDateType3 = {
//       ...(data as MatterDateType),
//       Date: (data as MatterDateType).Date.split("/") as [
//         string,
//         string,
//         string,
//       ],
//     };
//     return { linkName: value[1], ...transData };
//   });
//   // 排序
//   const sortedList = content.sort((a, b) => a.Id - b.Id);
//   // console.log(sortedList);
//   return sortedList;
// };

// export { getPostFileNames, getMatter };

export { getDirs, getSecondDir, getMdByYear, getMdFiles, getAllMatter };

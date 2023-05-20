import fs from "node:fs";
import matter from "gray-matter";

/** 调用 getDir 后得到的数据类型
 * @param cfd 当前目录以 “/ ” 为标志切分得到的数组
 * @param dir 目录下的所有文件夹
 * @param file 目录下的所有文件
 */
interface DirType {
  /**
   * 当前目录以 “/ ” 为标志切分得到的数组
   */
  cfd: string[];
  /**
   * 目录下的所有文件夹
   */
  dir: string[];
  /**
   * 目录下的所有文件
   */
  file: string[];
}

interface FullFileNameType {
  /**
   * 当前目录以 “/” 为标志切分得到的数组
   */
  cfd: string[];
  /**
   * 文件名
   */
  fileName: string;
  /**
   * 文件扩展名
   */
  extends: string;
}

interface YearFileNameType {
  /**
   * 文件发布的月份
   */
  month: string;
  /**
   * 文件名
   */
  file: string;
  /**
   * 文件扩展名
   */
  extends: string;
}

/**
 * @param Id 編號
 * @param Author 作者名
 * @param Date 發佈日期
 * @param Tag 標簽
 * @param Title 標題
 * @param Link 路由
 */
export interface MatterType {
  Id: number;
  Author: string;
  Date: string;
  Tag: string[];
  Title: string;
  Link: string;
  Description: string;
}

/**
 * 获取发布文章的顶级目录下的文件夹 => 年份文件夹
 * @param dirName 顶级目录名
 * @returns cfd: 从项目文件开始的全路径名分割成的数组，dir: cfd 目录下的所有文件, file: cfd 目录下的所有文件
 */
function getDirs(dirName: string): DirType {
  const dirs: string[] = [],
    files: string[] = [];
  fs.readdirSync(dirName).forEach((value) => {
    // 判断是否为目录
    if (/^[^\\:*<>|"?\r\n/\\.]+$/i.test(value)) {
      dirs.push(value);
    } else {
      // 判断是否为 md / mdx 文档
      if (/[\w]*\.md[x]?/i.test(value)) {
        files.push(value);
      }
    }
  });
  return {
    cfd: dirName.split("/"),
    dir: dirs,
    file: files,
  };
}

/**
 * 获取目录下深度为 2 的文件与文件夹 => 月份文件夹
 * @param dirName 从项目文件的顶级目录的顶级目录
 * @returns [ { cfd:string, dir:string[ ], file: string[ ] } ]
 */
function getSecondDir(dirName: string): DirType[] {
  // 获取深度为 1 的所有文件夹
  // 应为年份文件夹
  const firstDir: string[] = getDirs(dirName).dir;
  // 返回每个年份文件夹下的 文件与文件夹，合为一个数组
  // 应为月份文件夹
  return firstDir.map((value) => {
    const fullDir = `${dirName}/${value}`;
    return getDirs(fullDir);
  });
}

/**
 * 获取发布的 Md 文件
 * @param dirName 顶级目录名
 * @returns cfd: 路径数组, 从项目顶级目录开始, fileName 文件名字, extends 扩展名
 *
 */
function getMdFiles(dirName: string): FullFileNameType[] {
  // 一个包含许多对象的数组
  const fileList: FullFileNameType[] = [];
  const dirArr = getSecondDir(dirName);
  dirArr.forEach((value) => {
    const preDir = value.cfd.join("/");
    value.dir.forEach((month) => {
      fs.readdirSync(`${preDir}/${month}`).forEach((file) => {
        if (/[\w]*\.md[x]?/i.test(file))
          fileList.push({
            cfd: `${preDir}/${month}`.split("/"),
            fileName: `${file}`.replace(/\.md[x]?$/i, ""),
            extends: `${file}`.replace(/^[^\\:*<>|"?\r\n/\\.]+/i, ""),
          });
      });
    });
  });
  return fileList;
}

/**
 * 获取该年所有的文章 => 年份文件夹下的所有 mdx 文件，适用于 [...title] 目录
 * @param year 年份
 * @returns 一个数组, file 为一文件名, month 为该文件发布月份, extends 为文件扩展名
 */
function getMdByYear(year: string) {
  if (!fs.readdirSync("./post").includes(year)) throw new Error("Error Year!");
  // return false;

  // 获取该年下所有的月份文件夹
  const monthDir: string[] = [];
  fs.readdirSync(`./post/${year}`).forEach((value) => {
    if (/^[^\\:*<>|"?\r\n/\\.]+$/i.test(value)) {
      monthDir.push(value);
    }
  });
  const files: YearFileNameType[] = [];

  monthDir.map((month) => {
    fs.readdirSync(`./post/${year}/${month}`).forEach((fileName) => {
      files.push({
        month: month,
        file: `${fileName}`.replace(/\.md[x]?$/i, ""),
        extends: `${fileName}`.replace(/^[^\\:*<>|"?\r\n/\\.]+/i, ""),
      });
    });
  });
  return files;
}

function getFullFileName(dirName: string) {
  return getMdFiles(dirName).map((value) => {
    return `${value.cfd.join("/")}/${value.fileName}${value.extends}`;
  });
}

/**
 * 返回 Md 文件顶部的标注
 * @returns links 相对于调用目录的路由
 */
function getAllMatter(currentPath?: string) {
  return getMdFiles(currentPath ?? "./post")
    .map((value) => {
      return [
        `${value.cfd.join("/")}/${value.fileName}${value.extends}`,
        `${value.cfd.filter((value) => value !== "pages").join("/")}/${
          value.fileName
        }`,
      ] as [fullName: string, link: string];
    })
    .map((fileArr) => {
      const FileContent = fs.readFileSync(fileArr[0], "utf8");
      const { data } = matter(FileContent);
      return { links: fileArr[1], data: data as MatterType };
    });
}

export { getDirs, getSecondDir, getMdByYear, getMdFiles, getAllMatter };

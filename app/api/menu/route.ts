import fs from "node:fs";
import { NextResponse } from "next/server";
import matter from "gray-matter";

interface MatterType {
  Author: string;
  Date: string;
  Title: string;
  Link: string;
  Tag: [string, string, string];
  Description: string;
  Cover: string;
}

interface List {
  year: string;
  month: string;
  fileName: string;
  data: {
    author: string;
    title: string;
    date: string;
    link: string;
    tag: [string, string, string];
    description: string;
    cover: string;
  };
}

export async function GET() {
  // 年份目录
  let yearDir: string[] = [];
  fs.readdirSync("/post").forEach((year) => {
    yearDir.push(year);
  });

  // 月份目录
  let monthDir: { year: string; month: string }[] = [];
  yearDir.forEach((year) => {
    fs.readdirSync(`/post/${year}`).forEach((month) => {
      monthDir.push({ year, month });
    });
  });

  let fileDir: { year: string; month: string; fileName: string }[] = [];
  monthDir.forEach((path) => {
    fs.readdirSync(`/post/${path.year}/${path.month}`).forEach((fileName) => {
      fileDir.push({
        year: path.year,
        month: path.month,
        fileName: fileName,
      });
    });
  });

  const list: List[] = [];

  fileDir.forEach(({ year, month, fileName }) => {
    const { data } = matter(
      fs.readFileSync(`/post/${year}/${month}/${fileName}`, "utf-8")
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
  });

  return NextResponse.json(list);
}

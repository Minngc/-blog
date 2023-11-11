import articleNames from "@/external/config/articleNames.json";
import { serializeWithPlugin } from "./serialize";
import fs from "node:fs";
import matter from "gray-matter";
import basicInfo from "@/external/config/pages-config/basic.json";
import { datetrans, generateCover, generateTag } from ".";

export async function generateArticleData(params: string) {
  const path = (articleNames as any)[params];

  const fileContent = fs.readFileSync(path, "utf-8");

  const matterContent = matter(fileContent);
  const originMatter = matterContent.data;

  const frontmatter = {
    author: originMatter.Author ?? basicInfo.author,
    cover: generateCover(originMatter.Cover),
    date: datetrans(originMatter.Date),
    description: originMatter.Description ?? basicInfo.defaultDescription,
    link: originMatter.Link,
    tag: generateTag(originMatter.Tag),
    title: originMatter.Title,
  };

  const [content, tocHead] = await serializeWithPlugin(matterContent.content);
  return {
    frontmatter,
    content,
    tocHead,
  } as {
    frontmatter: {
      author: string;
      cover?: string[];
      date: string;
      description: string;
      link: string;
      tag: string[];
      title: string;
    };
    content: any;
    tocHead: any;
  };
}

import aboutConfig from "@/external/about/about.json";

export async function generateAboutInfo() {
  const data: { title: string; content: any; key: string }[] = [];
  for (let value of aboutConfig) {
    const matterContent = matter(
      fs.readFileSync(`./external/about/${value.filepath}`)
    );
    const [content] = await serializeWithPlugin(matterContent.content);
    data.push({ title: value.title, content, key: value.key });
  }
  return data;
}

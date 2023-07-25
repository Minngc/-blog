import { NextResponse } from "next/server";
import article from "@/config/articleNames.json";
import fs from "node:fs";
import matter from "gray-matter";
import { serializeWithPlugin } from "@/lib/func/serialize";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: { slug: string };
  }
) {
  const path = (article as any)[`${params.slug}`];
  try {
    const fileContent = fs.readFileSync(path, "utf-8");

    const matterContent = matter(fileContent);
    const originMatter = matterContent.data;
    const frontMatter = {
      author: originMatter.Author,
      cover: originMatter.Cover,
      date: originMatter.Date,
      description: originMatter.Description,
      link: originMatter.Link,
      tag: originMatter.Tag,
      title: originMatter.Title,
    };
    const [content, tocHead] = await serializeWithPlugin(matterContent.content);

    return NextResponse.json({ frontMatter, content, tocHead } as {
      frontMatter: {
        author: string;
        cover?: string;
        date: string;
        description: string;
        link: string;
        tag: string[];
        title: string;
      };
      content: any;
      tocHead: any;
    });
  } catch {
    return NextResponse.json({ error: "文章不存在" });
  }
}

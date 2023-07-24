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
  console.log(params.slug);
  const path = (article as any)[`${params.slug}`];
  try {
    const fileContent = fs.readFileSync(path, "utf-8");

    const matterContent = matter(fileContent);
    const frontmatter = matterContent.data;
    const [content, tocHead] = await serializeWithPlugin(matterContent.content);

    return NextResponse.json({ frontmatter, content, tocHead });
  } catch {
    return NextResponse.json({ error: "文章不存在" });
  }
}

import fs from "node:fs";
import { serializeWithPlugin } from "@/lib/func/serialize";
import aboutConfig from "@/external/about/about.json";
import matter from "gray-matter";
import { NextResponse } from "next/server";

export async function GET() {
  const data: { title: string; content: any; key: string }[] = [];
  for (let value of aboutConfig) {
    const matterContent = matter(
      fs.readFileSync(`./external/about/${value.filepath}`)
    );
    const [content] = await serializeWithPlugin(matterContent.content);
    data.push({ title: value.title, content, key: value.key });
  }
  console.log(data);
  return NextResponse.json(data);
}

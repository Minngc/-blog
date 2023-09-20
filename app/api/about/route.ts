import fs from "node:fs";
import { serializeWithPlugin } from "@/lib/func/serialize";
import matter from "gray-matter";
import { NextResponse } from "next/server";

export async function GET() {
  const filePath = [
    "./external/about/self_condition.md",
    "./external/about/about_site.md",
    "./external/about/sns_link.md",
  ];
  const data: any = [];
  for (let path of filePath) {
    const matterContent = matter(fs.readFileSync(path));
    const [content] = await serializeWithPlugin(matterContent.content);
    data.push(content);
  }
  return NextResponse.json(data);
}

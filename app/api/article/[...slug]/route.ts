import { NextResponse } from "next/server";
import article from "@/config/articleNames.json";

type ArticlePath = [year: string, month: string, title: string];

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: { slug: ArticlePath };
  }
) {
  console.log(params.slug);
  const fileName = params.slug[2];
  console.log((article as any)[`${fileName}`]);

  return NextResponse.json({ message: params.slug });
}

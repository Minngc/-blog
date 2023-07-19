import { NextResponse } from "next/server";

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
  return NextResponse.json({ message: params.slug });
}

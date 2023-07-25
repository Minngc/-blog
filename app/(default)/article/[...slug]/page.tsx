"use client";

import article from "@/config/articles.json";
import { MDXRemote } from "next-mdx-remote";
import useSWR from "swr";

type ArticlePath = [year: string, month: string, title: string];

function getMd(path: string) {
  const data = fetch(`http://localhost:3000/api/article/${path}`).then(
    (res) => {
      return res.json();
    }
  );
  return data;
}

const Article = (props: { params: { slug: ArticlePath } }) => {
  const { params } = props;
  const { data } = useSWR(params.slug[2], getMd, {
    suspense: true,
  });
  return (
    <>
      <MDXRemote {...data.content} />
    </>
  );
};

export default Article;

export async function generateStaticParams() {
  return article.map(({ year, month, data }) => {
    return { slug: [year, month, data.link] };
  });
}

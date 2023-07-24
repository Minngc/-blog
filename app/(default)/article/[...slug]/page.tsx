"use client";

import article from "@/config/articles.json";
import { MDXRemote } from "next-mdx-remote";
import { Suspense, useLayoutEffect, useState } from "react";
import useSWR from "swr"

type ArticlePath = [year: string, month: string, title: string];

async function getMd(path: string) {
  const data = await fetch(`http://localhost:3000/api/article/${path}`).then(
    (res) => {
      return res.json();
    }
  );
  return data;
}

const Article = (props: { params: { slug: ArticlePath } }) => {
  const { params } = props;
  const {data} = useSWR("/api/users/alluser", getMd, { suspense: true });
  const [content, setContent] = useState<any>();
  useLayoutEffect(() => {
    getMd(params.slug[2]).then((res) => {
      setContent(res.content);
    });
  }, [params.slug]);
  return (
    <>
        <MDXRemote {...content} />
    </>
  );
};

export default Article;

export async function generateStaticParams() {
  return article.map(({ year, month, data }) => {
    return { slug: [year, month, data.link] };
  });
}

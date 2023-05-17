import { GetStaticPaths, GetStaticProps } from "next";
import { getDirs, getMdByYear } from "lib/getPostFiles";
import fs from "node:fs";
import { ReactNode } from "react";
import matter from "gray-matter";
import { MatterType } from "lib/getPostFiles";
import { MDXRemote } from "next-mdx-remote";
import { serializeWithPlugin } from "lib/serialize";
import Code from "@/Layout/Test/code";
import { ParsedUrlQuery } from "node:querystring";
import Image from "next/image";
import { TitleListPanel } from "@/titleList";
import { LinkIcon } from "@/Icon";

const H2 = (props: { id: string; children?: ReactNode }) => {
  return (
    <h2 id={props.id} className="article-h2">
      <LinkIcon width={26} height={26} /> {props.children}
    </h2>
  );
};

const components = {
  wrapper: (props: any) => {
    return (
      <>
        <div className="articleContainer" {...props} />
      </>
    );
  },
  h1: (props: { id: string; children?: ReactNode }) => {
    return (
      <h1 id={props.id} className="article-h1">
        {props.children}
      </h1>
    );
  },
  h2: H2,
  h3: (props: { id: string; children?: ReactNode }) => {
    return (
      <h3 id={props.id} className="article-h3">
        <LinkIcon /> {props.children}
      </h3>
    );
  },
  h4: (props: { id: string; children?: ReactNode }) => {
    return (
      <h4 id={props.id} className="article-h4">
        {props.children}
      </h4>
    );
  },
  h5: (props: { id: string; children?: ReactNode }) => {
    return (
      <h5 id={props.id} className="article-h5">
        {props.children}
      </h5>
    );
  },
  h6: (props: { id: string; children?: ReactNode }) => {
    return (
      <h6 id={props.id} className="article-h6">
        {props.children}
      </h6>
    );
  },
  p: (props: { children?: ReactNode }) => {
    return <p className="article-p">{props.children}</p>;
  },
  a: (props: { href: string; children?: ReactNode }) => {
    if (props.href.startsWith("#"))
      return (
        <a
          onClick={(e) => {
            e.preventDefault();
            location.replace(props.href);
          }}
          href={props.href}
        >
          {props.children}
        </a>
      );
    return <a href={props.href}>{props.children}</a>;
  },
  img: (props: { src: string; alt: string }) => {
    return <Image src={props.src} alt={props.alt} />;
  },
  code: Code,
};

interface PostType extends ParsedUrlQuery {
  year: string;
  title: [month: string, title: string];
}

const Article = (props: any) => {
  return (
    <>
      <div className="wrapperContainer">
        <MDXRemote {...props.content} components={components} />
        <TitleListPanel tocHead={props.tocHead} />
      </div>
    </>
  );
};

const getStaticPaths: GetStaticPaths<PostType> = () => {
  const { dir } = getDirs("./post");
  const paths: {
    params: PostType;
  }[] = [];
  dir.forEach((year) => {
    getMdByYear(year).forEach((file) => {
      paths.push({
        params: {
          year: year,
          title: [file.month, file.file],
        },
      });
    });
  });
  return {
    paths: paths,
    fallback: false,
  };
};

const getStaticProps: GetStaticProps<any, PostType> = async ({ params }) => {
  let tocHead: (
    | { type: "nolist"; href: string; value: string }
    | {
        type: "haslist";
        href: string;
        value: string;
        children: { href: string; value: string }[];
      }
  )[];
  let data: { data: MatterType | undefined; content: any } = {
    data: undefined,
    content: undefined,
  };
  if (!params)
    return {
      props: {
        content: undefined,
        ...data.data,
      },
    };

  const fileContent = fs.readFileSync(
    `./post/${params.year}/${params.title.join("/")}.mdx`,
  );
  const MatterContent = matter(fileContent);
  data.data = MatterContent.data as MatterType;
  [data.content, tocHead] = await serializeWithPlugin(MatterContent.content);

  return {
    props: {
      tocHead: tocHead,
      content: data.content,
      ...data.data,
    },
  };
};

export { getStaticPaths, getStaticProps };
export default Article;

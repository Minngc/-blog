import { GetStaticPaths, GetStaticProps } from "next";
import { getDirs, getMdByYear } from "lib/getPostFiles";
import fs from "node:fs";
import matter from "gray-matter";
import { MatterType } from "lib/getPostFiles";
import { MDXRemote } from "next-mdx-remote";
import { serializeWithPlugin } from "lib/serialize";
import Header from "@/Layout/Test/header";
import Code from "@/Layout/Test/code";

const components = {
  h1: Header,
  code: Code,
};

const Article = (props: any) => {
  return (
    <>
      <MDXRemote {...props.content} components={components} />
    </>
  );
};

const getStaticPaths: GetStaticPaths = () => {
  const { dir } = getDirs("./post");
  const paths: { params: { year: string; title: string[] } }[] = [];
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

const getStaticProps: GetStaticProps = async (context) => {
  const params = context.params as { year: string; title: string[] };
  let data: { data: MatterType | undefined; content: any } = {
    data: undefined,
    content: undefined,
  };
  try {
    try {
      const fileContent = fs.readFileSync(
        `./post/${params.year}/${params.title.join("/")}.mdx`,
      );
      const MatterContent = matter(fileContent);
      data.data = MatterContent.data as MatterType;
      data.content = await serializeWithPlugin(MatterContent.content);
    } catch (err) {
      const fileContent = fs.readFileSync(
        `./post/${params.year}/${params.title.join("/")}.md`,
      );
      const MatterContent = matter(fileContent);
      data.data = MatterContent.data as MatterType;
      data.content = data.content = await serializeWithPlugin(
        MatterContent.content,
      );
    }
  } catch (err) {
    console.log(err);
    throw new Error("ErrorFile!");
  }

  // console.log(data.content)
  // console.log(await parseMarkDown(data.content))
  // await compileFunction()
  //  fs.readFile(
  //     `./post/${params.year}/${params.title.join("/")}.mdx`,
  //     (err, fileContent) => {
  //       if (!err) {
  // data = matter(fileContent) as unknown as {
  //   data: MatterType;
  //   content: string;
  // };
  //         return;
  //       }
  //       data = matter(
  //         fs.readFileSync(`./post/${params.year}/${params.title.join("/")}.md`),
  //       ) as unknown as {
  //         data: MatterType;
  //         content: string;
  //       };
  //     },
  //   );
  return {
    props: {
      content: data.content,
      ...data.data,
    },
  };
};

export { getStaticPaths, getStaticProps };
export default Article;

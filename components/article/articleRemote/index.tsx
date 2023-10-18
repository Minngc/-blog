"use client";

import { MDXRemote } from "next-mdx-remote";
import { articleReplaceComponents } from "../articleReplaceComponents";

const ArticleRemote = (props: {
  content: any;
}) => {
  return <MDXRemote {...props.content} components={articleReplaceComponents} />;
};

export { ArticleRemote };

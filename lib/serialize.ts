import remarkFrontmatter from "remark-frontmatter";
import rehypeAutolinkHeadings from "rehype-autolink-headings/lib";
import rehypeToc from "rehype-toc";
import rehypeSlug from "rehype-slug";
import { serialize } from "next-mdx-remote/serialize";

const serializeWithPlugin = async (content: string) => {
  return await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkFrontmatter],
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: "append",
            content: { type: "text", value: "" },
          },
        ],
        [rehypeToc, { headings: ["h2", "h3", "h4", "h5", "h6"] }],
      ],
    },
  });
};

export { serializeWithPlugin };

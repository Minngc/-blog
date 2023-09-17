import remarkFrontmatter from "remark-frontmatter";
import rehypeAutolinkHeadings from "rehype-autolink-headings/lib";
import rehypeToc from "rehype-toc";
import rehypeSlug from "rehype-slug";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypePrism from "rehype-prism-plus";

const serializeWithPlugin = async (content: string) => {
  let tocHead: (
    | { type: "nolist"; h2_index: string; href: string; value: string }
    | {
        type: "haslist";
        h2_index: string;
        href: string;
        value: string;
        children: { h3_index: string; href: string; value: string }[];
      }
  )[] = [];
  const serializeContent = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkFrontmatter, remarkGfm, remarkMath],
      rehypePlugins: [
        [rehypePrism, { ignoreMissing: true, showLineNumbers: true }],
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: "wrap",
            // content: { type: "text", value: "" },
          },
        ],
        [
          rehypeToc,
          {
            headings: ["h2", "h3"],
            nav: false,
            customizeTOC: (toc: any) => {
              if (toc.children) {
                const H2List = toc.children;
                tocHead = H2List.map((value: any, h2_index: number) => {
                  if (value.children.length && value.children.length === 2) {
                    const H3List = value.children[1].children;
                    const H3Title = H3List.map(
                      (value: any, h3_index: number) => {
                        return {
                          h3_index: `${h2_index + 1}.${h3_index + 1}.`,
                          href: value.children[0].properties.href,
                          value: value.children[0].children[0].value,
                        };
                      }
                    );
                    return {
                      h2_index: `${h2_index + 1}.`,
                      type: "haslist",
                      href: value.children[0].properties.href,
                      value: value.children[0].children[0].value,
                      children: H3Title,
                    };
                  } else
                    return {
                      type: "nolist",
                      h2_index: `${h2_index + 1}.`,
                      href: value.children[0].properties.href,
                      value: value.children[0].children[0].value,
                    };
                });
              }
              return false;
            },
          },
        ],
      ],
    },
  });
  return [serializeContent, tocHead] as const;
};

export { serializeWithPlugin };

import remarkFrontmatter from "remark-frontmatter";
import rehypeAutolinkHeadings from "rehype-autolink-headings/lib";
import rehypeToc from "rehype-toc";
import rehypeSlug from "rehype-slug";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

const serializeWithPlugin = async (content: string) => {
  let tocHead: (
    | { type: "nolist"; href: string; value: string }
    | {
        type: "haslist";
        href: string;
        value: string;
        children: { href: string; value: string }[];
      }
  )[] = [];
  const serializeContent = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkFrontmatter, remarkGfm, remarkMath],
      rehypePlugins: [
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
                tocHead = H2List.map((value: any) => {
                  if (value.children.length && value.children.length === 2) {
                    const H3List = value.children[1].children;
                    const H3Title = H3List.map((value: any) => {
                      return {
                        href: value.children[0].properties.href,
                        value: value.children[0].children[0].value,
                      };
                    });
                    return {
                      type: "haslist",
                      href: value.children[0].properties.href,
                      value: value.children[0].children[0].value,
                      children: H3Title,
                    };
                  } else
                    return {
                      type: "nolist",
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

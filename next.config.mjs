import nextMdx from "@next/mdx";
import remarkFrontmatter from "remark-frontmatter";
import withSass from "@zeit/next-sass"

const withMdx = nextMdx({
  extension: /\.mdx?$/,
  options: {
    providerImportSource: "@mdx-js/react",
    //...
    remarkPlugins: [remarkFrontmatter],
    rehypePlugins: [],
  },
});

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  pageExtensions: ["md", "mdx", "tsx", "ts", "jsx", "js"],
  reactStrictMode: true,
};

export default withMdx(nextConfig);

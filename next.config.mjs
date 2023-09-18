import nextMdx from "@next/mdx";
import remarkFrontmatter from "remark-frontmatter";

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
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "q1.qlogo.cn",
      },
    ],
  },
};

export default withMdx(nextConfig);

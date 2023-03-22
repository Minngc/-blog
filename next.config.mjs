import nextMdx from "@next/mdx";

const withMdx = nextMdx({
  extension: /\.mdx?$/,
  options: {
    providerImportSource: "@mdx-js/react",
    //...
    remarkPlugins: [],
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

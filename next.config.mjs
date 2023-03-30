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

webpack: (config) => {
  config.resolve.fallback = {
    fs: false,
    net: false,
    dns: false,
    child_process: false,
    tls: false,
  };

  return config;
};

export default withMdx(nextConfig);

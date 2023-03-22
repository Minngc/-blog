import { type AppProps } from "next/app";
import { MDXProvider } from "@mdx-js/react";
import "styles/globals.css";
import Header from "@/Layout/Test/header";
import Code from "@/Layout/Test/code";

const components = {
  h1: Header,  code: Code,

};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MDXProvider components={components}>
        <Component {...pageProps} />
    </MDXProvider>
  );
}

import { type AppProps } from "next/app";
import { MDXProvider } from "@mdx-js/react";
import "styles/globals.scss";
import Header from "@/Layout/Test/header";
import Code from "@/Layout/Test/code";
import TopNav from "@/Layout/TopNav";

export default function App({ Component, pageProps }: AppProps) {
  return (
      <TopNav>
        <Component {...pageProps} />
      </TopNav>
  );
}

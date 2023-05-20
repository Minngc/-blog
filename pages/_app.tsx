import { type AppProps } from "next/app";
import "styles/globals.scss";
import { TopNav } from "@/Layout/TopNav";
import { ScrollToTop } from "@/scrollToTop";
import { XWSC } from "@fonts/index";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <TopNav />
      <ScrollToTop />
      <div className={`globalContainer ${XWSC.variable}`}>
        <Component {...pageProps} />
      </div>
    </>
  );
}

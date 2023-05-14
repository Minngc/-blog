import { type AppProps } from "next/app";
import "styles/globals.scss";
import { TopNav } from "@/Layout/TopNav";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <TopNav />
      <div className={"globalContainer"}>
        <Component {...pageProps} />
      </div>
    </>
  );
}

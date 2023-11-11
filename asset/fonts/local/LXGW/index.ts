import localFont from "next/font/local";

const LXGW = localFont({
  src: [
    {
      path: "./LXGWWenKai-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./LXGWWenKai-Regular.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./LXGWWenKai-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./LXGWWenKai-Bold.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--local-lxgw",
});

export { LXGW };

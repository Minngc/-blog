import localFont from "next/font/local";

const LXGW = localFont({
  src: [
    {
      path: "./LXGW/LXGWWenKai-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./LXGW/LXGWWenKai-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./LXGW/LXGWWenKai-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  preload: true,
  variable: "--LXGW",
});

const LXGWMono = localFont({
  src: [
    {
      path: "./LXGWMono/LXGWWenKaiMono-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./LXGWMono/LXGWWenKaiMono-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./LXGWMono/LXGWWenKaiMono-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  preload: true,
  variable: "--LXGW-Mono",
});

export { LXGW, LXGWMono };

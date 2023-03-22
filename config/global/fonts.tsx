import localFont from "next/font/local";

const localNormalFont = localFont({
  src: [
    {
      path: "../../public/assets/fonts/LXGWWenKai-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/LXGWWenKai-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/LXGWWenKai-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  preload: true,
});

const localMonoFont = localFont({
  src: [
    {
      path: "../../public/assets/fonts/LXGWWenKaiMono-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/LXGWWenKaiMono-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/assets/fonts/LXGWWenKaiMono-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  preload: true,
});

export { localMonoFont, localNormalFont };

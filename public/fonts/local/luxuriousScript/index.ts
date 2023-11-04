import localFont from "next/font/local";

const LocalLuxuriousScript = localFont({
  src: [
    {
      path: "./LuxuriousScript-Regular.ttf",
      weight: "400",
    },
  ],
  variable: "--local-luxuriousScript",
});

export { LocalLuxuriousScript };

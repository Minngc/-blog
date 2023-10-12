import { ReactNode } from "react";
import classNames from "classnames";
import styles from "./page.module.scss";
import { Line } from "@/components/line";
import { SWRProvider } from "@/components/swrconfig";

const getAbout = async (url: string) => {
  const data = await fetch(`http://localhost:3000/api/${url}`).then((res) => {
    return res.json();
  });
  return data;
};

const AboutLayout = async (props: {
  children: ReactNode;
  info: ReactNode;
  links: ReactNode;
}) => {
  const { children, info, links } = props;
  const data = await getAbout("about");
  const fallback = {
    about: data,
  };

  return (
    <>
      {children}
      <div className={classNames(styles.info)}>
        <SWRProvider fallback={fallback}>{info}</SWRProvider>
      </div>
      <div className={classNames(styles.links)}>{links}</div>
    </>
  );
};

export default AboutLayout;

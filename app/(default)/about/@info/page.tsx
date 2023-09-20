"use client";

import classNames from "classnames";
import styles from "./page.module.scss";
import { Line } from "@/components/line";
import { MDXRemote } from "next-mdx-remote";
import useSWR from "swr";

const getAbout = async (url: string) => {
  const data = await fetch(`http://localhost:3000/api/${url}`).then((res) => {
    return res.json();
  });
  return data;
};

const Info = () => {
  const { data } = useSWR("about", getAbout, { suspense: true });
  return (
    <>
      <div className={classNames(styles.container)}>
        <div className={classNames(styles.infoContainer)}>
          <div className={classNames(styles.title)}>自我介紹</div>
          <div className={classNames(styles.info)}>
            <MDXRemote {...data[0]} />
          </div>
        </div>
      </div>

      <div className={classNames(styles.container)}>
        <div className={classNames(styles.infoContainer)}>
          <div className={classNames(styles.title)}>關於本站</div>
          <div className={classNames(styles.info)}>
            <MDXRemote {...data[1]} />
          </div>
        </div>
      </div>

      <div className={classNames(styles.container)}>
        <div className={classNames(styles.infoContainer)}>
          <div className={classNames(styles.title)}>社群鏈接</div>
          <div className={classNames(styles.info)}>
            <MDXRemote {...data[2]} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Info;

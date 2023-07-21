import classNames from "classnames";
import { ReactNode } from "react";
import styles from "./page.module.scss";
import { Tag } from "@/components/anchor";
import { Line } from "@/components/line";
import Image from "next/image";
import bg from "@public/bg.jpg";

type ArticlePath = [year: string, month: string, title: string];

const ArticleLayout = (props: {
  children: ReactNode;
  menu: ReactNode;
  params: { slug: ArticlePath };
}) => {
  const { children, params, menu } = props;
  return (
    <>
      <div className={classNames(styles.header)}>
        <div className={classNames(styles.title)}>這是一個文章的標題</div>
        <div className={classNames(styles.author)}>Ming</div>
        <div className={classNames(styles.date)}>2023/06/04</div>
        <div className={classNames(styles.backImage)}>
          <div className={classNames(styles.imageContainer)}>
            <Image
              className={classNames(styles.img_small)}
              src={bg}
              alt={"backgroundImage"}
              objectFit="cover"
              width={450}
              height={500}
            />
            <Image
              className={classNames(styles.img_middle)}
              src={bg}
              alt={"backgroundImage"}
              objectFit="cover"
              width={900}
              height={700}
            />
            <Image
              className={classNames(styles.img_large)}
              src={bg}
              alt={"backgroundImage"}
              objectFit="cover"
            />
          </div>
        </div>
      </div>
      <div className={classNames(styles.container)}>
        <div className={classNames(styles.article)}>
          <div className={classNames(styles.description)}>
            <div className={classNames(styles.descLine)} />
            这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述这里是描述
          </div>
          {children}
        </div>
        <div className={classNames(styles.menu)}>{menu}</div>
      </div>
    </>
  );
};

export default ArticleLayout;

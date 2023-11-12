import classNames from "classnames";
import Image from "next/image";
import bg from "@/asset/img/bg.jpg";
import bgDark from "@/asset/img/bg-dark.jpg";
import styles from "./index.module.scss";

export const ArticleHeader = (props: {
  title: string;
  author: string;
  date: string;
  cover?: string[];
}) => {
  const { title, author, date, cover = ["", ""] } = props;
  return (
    <>
      <header className={classNames(styles.header)}>
        <div className={classNames(styles.title)}>{title}</div>
        <div className={classNames(styles.author)}>{author}</div>
        <div className={classNames(styles.date)}>{date}</div>
        <div className={classNames(styles.backImage)}>
          <div className={classNames(styles.imageContainer)}>
            <Image
              src={cover[0] === "" ? bg : cover[0]}
              className={classNames(styles.imgCover, styles.lightCover)}
              alt=""
              sizes="100vw"
            />
            <Image
              src={cover[1] === "" ? bgDark : cover[1]}
              className={classNames(styles.imgCover, styles.darkCover)}
              alt=""
              sizes="100vw"
            />
          </div>
        </div>
      </header>
    </>
  );
};

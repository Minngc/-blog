import classNames from "classnames";
import Image from "next/legacy/image";
import bg from "@/asset/img/bg.jpg";
import bgDark from "@/asset/img/bg-dark.jpg";
import styles from "./index.module.scss"

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
              objectFit="cover"
              sizes="100vw"
              className={classNames(styles.imgCover, styles.lightCover)}
              alt=""
            />
            <Image
              src={cover[1] === "" ? bgDark : cover[1]}
              objectFit="cover"
              sizes="100vw"
              className={classNames(styles.imgCover, styles.darkCover)}
              alt=""
            />
          </div>
        </div>
      </header>
    </>
  );
};

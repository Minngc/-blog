import classNames from "classnames";
import { ReactNode } from "react";
import styles from "./page.module.scss";
import Image from "next/image";
import bg from "@public/bg.jpg";
import bgDark from "@public/bg-dark.jpg";
import { generateArticleData } from "@/lib/func/dataGenerate";
import { datetrans } from "@/lib/func";

type ArticlePath = [year: string, month: string, title: string];

const ArticleLayout = async (props: {
  children: ReactNode;
  index: ReactNode;
  params: { slug: ArticlePath };
}) => {
  const {
    children,
    params: { slug },
    index,
  } = props;

  const {
    frontmatter: { title, author, date, description },
  } = await generateArticleData(slug[2]);
  const realDate = datetrans(date)
  return (
    <>
      <div className={classNames(styles.header)}>
        <div className={classNames(styles.title)}>{title}</div>
        <div className={classNames(styles.author)}>{author}</div>
        <div className={classNames(styles.date)}>{realDate}</div>
        <div className={classNames(styles.backImage)}>
          <div className={classNames(styles.imageContainer)}>
            <Image
              className={classNames(styles.img_small, styles.articleImage)}
              src={bg}
              alt={"backgroundImage"}
              objectFit="cover"
              width={450}
              height={500}
            />
            <Image
              src={bgDark}
              alt={"backgroundImage"}
              className={classNames(
                styles.img_small_dark,
                styles.articleImage_dark
              )}
              width={450}
              height={500}
            />
            <Image
              className={classNames(styles.img_middle, styles.articleImage)}
              src={bg}
              alt={"backgroundImage"}
              objectFit="cover"
              width={900}
              height={700}
            />
            <Image
              src={bgDark}
              alt={"backgroundImage"}
              className={classNames(
                styles.img_middle_dark,
                styles.articleImage_dark
              )}
              width={900}
              height={700}
            />
            <Image
              className={classNames(styles.img_large, styles.articleImage)}
              src={bg}
              alt={"backgroundImage"}
              objectFit="cover"
            />
            <Image
              className={classNames(
                styles.img_large_dark,
                styles.articleImage_dark
              )}
              src={bgDark}
              alt={"backgroundImage"}
              objectFit="cover"
            />
          </div>
        </div>
      </div>
      <div className={classNames(styles.container)}>
        <div className={classNames(styles.article)}>
          {description && (
            <div className={"article-ele-blockquote"}>
              <p className="article-ele-p">{description}</p>
            </div>
          )}
          {children}
        </div>
        <div className={classNames(styles.index)}>{index}</div>
      </div>
    </>
  );
};

export default ArticleLayout;

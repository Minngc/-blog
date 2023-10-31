import Link from "next/link";
import { Tag } from "../../anchor";
import classNames from "classnames";
import styles from "./index.module.scss";

const TagIcon = () => {
  return (
    <>
      <svg
        width="16"
        height="17"
        viewBox="0 0 16 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="tagIcon/16" clipPath="url(#clip0_24_715)">
          <path
            id="Union"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.24972 4.50246C6.30101 4.41362 6.37839 4.3427 6.47136 4.29934L11.2123 2.0878C11.5269 1.94106 11.8916 2.15163 11.9218 2.49741L12.377 7.70895C12.3859 7.81115 12.3632 7.91362 12.3119 8.00246L8.8907 13.9281C8.75263 14.1673 8.44684 14.2492 8.20769 14.1112L3.01154 11.1112C2.77239 10.9731 2.69046 10.6673 2.82853 10.4281L6.24972 4.50246ZM7.11444 5.00473C7.16654 4.91448 7.24554 4.84277 7.3404 4.79961L10.4725 3.37474C10.7847 3.23268 11.1441 3.44013 11.1772 3.78161L11.5092 7.20648C11.5193 7.31021 11.4967 7.41448 11.4446 7.50473L8.52468 12.5621C8.38661 12.8013 8.08081 12.8832 7.84167 12.7451L4.37756 10.7451C4.13842 10.6071 4.05648 10.3013 4.19455 10.0621L7.11444 5.00473ZM10.4087 7.29893C9.99447 8.01637 9.07708 8.26218 8.35964 7.84797C7.6422 7.43376 7.39639 6.51637 7.8106 5.79893C8.22482 5.08149 9.1422 4.83568 9.85964 5.2499C10.5771 5.66411 10.8229 6.58149 10.4087 7.29893ZM9.75916 6.92393C9.55205 7.28265 9.09336 7.40556 8.73464 7.19845C8.37592 6.99135 8.25302 6.53265 8.46012 6.17393C8.66723 5.81521 9.12592 5.69231 9.48464 5.89941C9.84336 6.10652 9.96627 6.56521 9.75916 6.92393Z"
            fill="black"
          />
        </g>
        <defs>
          <clipPath id="clip0_24_715">
            <rect
              width="16"
              height="16"
              fill="white"
              transform="translate(0 0.5)"
            />
          </clipPath>
        </defs>
      </svg>
    </>
  );
};
interface ArticleMatterType {
  author: string;
  cover?: string;
  date: string;
  description: string;
  link: string;
  tag: string[];
  title: string;
}

interface ArticleProps {
  year: string;
  month: string;
  data: ArticleMatterType;
}

const ArticleCard = (
  props: ArticleProps & { className?: string; replace?: boolean }
) => {
  const {
    className = "",
    replace = false,
    year,
    month,
    data: { link, tag, author, date, title, description },
  } = props;
  return (
    <div className={classNames(styles.container, className)}>
      <div className={classNames(styles.header)}>
        <div className={classNames(styles.articleTitle)}>{title}</div>
        <div className={classNames(styles.date)}>{date}</div>
      </div>

      <div className={classNames(styles.mainContent)}>
        <div className={classNames(styles.description)}>
          {description === "" ? (
            <span className={styles.defaultDescription}>
              {"No Description"}
            </span>
          ) : (
            description
          )}
        </div>
      </div>

      <div className={classNames(styles.footer)}>
        <div className={styles.link}>
          <Link href={`/article/${year}/${month}/${link}`}>
            {"查看全文 ＞"}
          </Link>
        </div>
        <div className={styles.tagList}>
          <TagIcon />
          <Tag replace={replace} tag={tag} />
        </div>
      </div>
    </div>
  );
};

const ArticleCardWithImage = (props: ArticleProps & { replace?: boolean }) => {
  return (
    // <div className={classNames(styles.container_withImage)}>
    //   <div className={classNames(styles.image)}>
    //     <Image src={bg} alt={"bg"} width={300} height={200} />
    //   </div>
    <ArticleCard
      {...props}
      replace={props.replace}
      className={classNames(styles.articleContainer)}
    />
    // </div>
  );
};

export { ArticleCard, ArticleCardWithImage };

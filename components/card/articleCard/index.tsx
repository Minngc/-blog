import classNames from "classnames";
import styles from "./index.module.scss";
import { MatterType } from "lib/getPostFiles";
import Link from "next/link";
import { AngleIcon } from "@/Icon";
import TagCard from "../tagCard.tsx";

const ArticleCard = (props: { data: MatterType; links: string }) => {
  const {
    data: {
      Id: id,
      Author: author,
      Title: title,
      Tag: tag,
      Date: date,
      Description: description,
    },
    links: link,
  } = props;
  return (
    <div className={classNames([styles.cardContainer])}>
      <div className={classNames([styles.card2])}>
        <div className={classNames([styles.mainContent])}>
          <div className={classNames([styles.title])}>
            <Link href={link} title={title}>
              {title}
            </Link>
          </div>
          <div className={classNames([styles.author])}>{author}</div>
          <div className={classNames([styles.containerOfTagADate])}>
            <div className={classNames([styles.tag])}>
              {tag.map((value) => {
                return (
                  <TagCard
                    key={`tag_link_${value}`}
                    tagName={value}
                    href={"./"}
                  />
                );
              })}
            </div>
            <div className={classNames([styles.date])}>{date}</div>
          </div>
        </div>

        <div>
          <div className={classNames([styles.description])}>{description}</div>
          <div className={classNames([styles.cardFooter])}>
            <Link href={link}>
              查看全文
              <AngleIcon className={styles.cardAngel} height={16} width={16} />
            </Link>
          </div>
        </div>
      </div>
      <div className={classNames([styles.behind])}></div>
    </div>
  );
};

export default ArticleCard;

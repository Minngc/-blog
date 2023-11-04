import classNames from "classnames";
import styles from "./page.module.scss";
import listOrderByYear from "@/external/config/listOrderByYear.json";
import Link from "next/link";
import { datetrans } from "@/lib/func";

const Timeline = () => {
  const years = Object.keys(listOrderByYear).sort(
    (a, b) => Number(b) - Number(a)
  );

  return (
    <>
      {years.map((year) => {
        return (
          <TimeLineItem
            key={`timeline_item_${year}`}
            year={year}
            list={(listOrderByYear as any)[year]}
          />
        );
      })}
    </>
  );
};

const TimeLineItem = (props: {
  year: string;
  list: {
    year: string;
    month: string;
    title: string;
    link: string;
    date: string;
  }[];
}) => {
  const { list, year } = props;
  if (list.length === 0) return null;
  return (
    <div className={classNames(styles.yearContainer)}>
      <div className={classNames(styles.title)}>{year}</div>

      <div className={styles.postList}>
        {list.map(({ year, month, title, link, date }) => {
          return (
            <Link
              href={`./article/${year}/${month}/${link}`}
              key={`${year}_${month}_${link}`}
              className={styles.postItem}
            >
              <span className={styles.postDate}>{datetrans(date, false)}</span>
              <span className={styles.postTitle}>{title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;

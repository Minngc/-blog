import classNames from "classnames";
import styles from "./page.module.scss";
import listOrderByYear from "@/config/listOrderByYear.json";
import { useSearchParams } from "next/navigation";
import { Line } from "@/components/line";
import Link from "next/link";

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
  return (
    <div className={classNames(styles.yearContainer)}>
      <div className={classNames(styles.title)}>{year}</div>
      <Line />

      <ul className={styles.postList}>
        {list.map(({ year, month, title, link, date }) => {
          return (
            <li key={`${year}_${month}_`} className={styles.postItem}>
              <Link href={`./article/${year}/${month}/${link}`}>
                <span className={styles.postTitle}>{title}</span>
                <span className={styles.postDate}>({date})</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Timeline;

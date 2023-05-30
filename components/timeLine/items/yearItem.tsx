import { MatterType } from "lib/getPostFiles";
import styles from "./index.module.scss";
import MonthItem from "./monthItem";

interface TimeLIneYearItem {
  year: string;
  monthList: {
    month: string;
    articleList: MatterType[];
  }[];
}

const YearItem = (props: TimeLIneYearItem) => {
  const { year, monthList } = props;
  return (
    <>
      <div className={styles.yearTitle}>
        <div className={styles.yearCircle}>
          <div className={styles.triAngel} />
        </div>
        <div>{year}</div>
      </div>
      {monthList.map((monthItem) => {
        return (
          <MonthItem
            key={`article_item${year}_${monthItem.month}`}
            {...monthItem}
          />
        );
      })}
    </>
  );
};

export default YearItem;

import styles from "./index.module.scss";
import ArticleItem from "./articleItem";
import { MatterType } from "lib/getPostFiles";

interface TimeLineMonthItem {
  month: string;
  articleList: MatterType[];
}

const MonthItem = (props: TimeLineMonthItem) => {
  const { month, articleList } = props;
  return (
    <>
      <div className={styles.monthTitle}>
        <div className={styles.monthCircle}>
          <div className={styles.selectedDots} />
        </div>
        <div>{month[0] === "0" ? month[1] : month}月</div>
      </div>
      <div>
        {articleList.map((articleItem, index) => {
          return (
            <ArticleItem
              key={`articleItem_${month}_${articleItem.Href}_${index}`}
              {...articleItem}
            />
          );
        })}
      </div>
    </>
  );
};

export default MonthItem;

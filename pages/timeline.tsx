import styles from "@styles/TimeLine.module.scss";
import Image from "next/image";
import test from "@image/testPhoto.png";
import Link from "next/link";
import { AngleIcon } from "@/Icon";
import TagCard from "@/card/tagCard.tsx";
import YearItem from "@/timeLine/items/yearItem";
import MonthItem from "@/timeLine/items/monthItem";
import ArticleItem from "@/timeLine/items/articleItem";

import { MatterType, getTimeLine } from "lib/getPostFiles";
import { useEffect } from "react";

const Timeline = (props: {
  data: {
    year: string;
    monthItem: {
      month: string;
      articleList: MatterType[];
    }[];
  }[];
}) => {
  useEffect(() => {
    console.log(props.data);
  });
  return (
    <>
      <div className={styles.timeLineWrapper}>
        <div className={styles.timeLine}>
          <div className={styles.title}>时间轴</div>
          <hr />
          <div className={styles.line} />
          {props.data.map((yearItem) => {
            return <YearItem key={`timeLine_yearItem_${yearItem.year}`} year={yearItem.year}  monthList={yearItem.monthItem} />;
          })}
          {/* <YearItem year="2023" /> */}
          {/* <MonthItem month="3" />
          <ArticleItem
            date={"2023/5/1"}
            author={"Ming"}
            link="./"
            title="这是一篇博文的标题"
          /> */}
        </div>
      </div>
    </>
  );
};
export default Timeline;

const getStaticProps = () => {
  const data = getTimeLine();
  return {
    props: { data },
  };
};

export { getStaticProps };

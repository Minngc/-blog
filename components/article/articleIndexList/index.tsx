"use client";
import { MouseEventHandler } from "react";
import { useRef, useEffect, useState } from "react";
import { ArticleIndexItem } from "./articleIndexItem";

interface IndexWithChildren {
  type: "haslist";
  h2_index: string;
  href: string;
  value: string;
  children: { h3_index: string; href: string; value: string }[];
}

interface IndexWithoutChildren {
  type: "nolist";
  h2_index: string;
  href: string;
  value: string;
}

export type Index = (IndexWithChildren | IndexWithoutChildren) & {
  onClick: MouseEventHandler;
  selected: boolean;
};

const IndexList = (props: {
  tocHead: (IndexWithChildren | IndexWithoutChildren)[];
}) => {
  const idList = useRef(
    props.tocHead.map((value) => {
      return value.href.replace("#", "");
    })
  );
  const clicked = useRef(false);
  const [current, setCurrent] = useState(-1);
  const handleClick = (index: number) => {
    return () => {
      clicked.current = true;
      setCurrent(index);
    };
  };

  useEffect(() => {
    const observe = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // 若在范围外或者跑出范围, 并且是当前高亮标题的下一个标题，并且 此时还存在于屏幕范围内，则高亮跑出范围的标题
          if (
            !entry.isIntersecting &&
            idList.current[ref.current.next] === entry.target.id
          ) {
            if (entry.target.getBoundingClientRect().top < 181) {
              ref.current.current++;
              ref.current.next++;
            }
            !clicked.current && setCurrent(ref.current.current);
          }
          // 若当前标题在范围内, 或者跑入范围内时
          else {
            // 跑入范围内的为当前高亮标题时
            if (
              ref.current.current >= 0 &&
              idList.current[ref.current.current] === entry.target.id
            ) {
              // 设置高亮标题为上一个
              ref.current.next--;
              ref.current.current--;
              !clicked.current && setCurrent(ref.current.current);
            }
          }
        });
        clicked.current = false;
      },
      {
        rootMargin: "-180px 0px 0px 0px",
      }
    );
    document.querySelectorAll("h2").forEach((ele) => {
      observe.observe(ele);
    });
    return () => {
      observe.disconnect();
    };
  }, [idList]);

  const ref = useRef<{ current: number; next: number }>({
    current: -1,
    next: 0,
  });

  return (
    <>
      {props.tocHead.map((value, index) => {
        return (
          <ArticleIndexItem
            key={value.href + value.value}
            {...{
              selected: index === current,
              onClick: handleClick(index),
              ...value,
            }}
          />
        );
      })}
    </>
  );
};

export { IndexList };

"use client";

import classNames from "classnames";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import useSWR from "swr";
import styles from "./page.module.scss";
import { IndexList } from "@/components/list";

interface IndexWithChildren {
  type: "haslist";
  href: string;
  value: string;
  children: { href: string; value: string }[];
}

interface IndexWithoutChildren {
  type: "nolist";
  href: string;
  value: string;
}

function getMd(path: string) {
  const data = fetch(`http://localhost:3000/api/article/${path}`).then(
    (res) => {
      return res.json();
    }
  );
  return data;
}

const Menu = (props: { params: { slug: [string, string, string] } }) => {
  const { data } = useSWR(props.params.slug[2], getMd, { suspense: true }) as {
    data: { tocHead: (IndexWithChildren | IndexWithoutChildren)[] };
  };

  const IdList = useRef(
    data.tocHead.map((value) => {
      return value.href.replace("#", "");
    })
  );

  const ref = useRef<{ current: number; next: number }>({
    current: -1,
    next: 0,
  });

  const clicked = useRef(false);
  const [current, setCurrent] = useState(-1);

  const handleClick = (index: number) => {
    return () => {
      clicked.current = true;
      setCurrent(index);
    };
  };

  useEffect(() => {
    console.log("on running");
    const observe = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log(IdList.current);
          // 若在范围外或者跑出范围, 并且是当前高亮标题的下一个标题，并且 此时还存在于屏幕范围内，则高亮跑出范围的标题
          if (
            !entry.isIntersecting &&
            IdList.current[ref.current.next] === entry.target.id
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
              IdList.current[ref.current.current] === entry.target.id
            ) {
              // 设置高亮标题为上一个
              ref.current.next--;
              ref.current.current--;
              !clicked.current && setCurrent(ref.current.current);
            }
          }
          console.log(entry.target.id, " ", ref.current);
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
  }, [IdList]);

  return (
    <>
      <ul>
        {data.tocHead.map((value, index) => {
          return (
            <IndexList
              key={value.href + value.value}
              {...{
                index: index,
                selected: index === current,
                onClick: handleClick(index),
                ...value,
              }}
            />
          );
        })}
      </ul>
    </>
  );
};

export default Menu;

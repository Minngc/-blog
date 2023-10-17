import classNames from "classnames";
import styles from "./index.module.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Search = (props: {
  filterData: {
    years: { title: string; link: string }[];
    classes: { title: string; link: string }[];
  };
  searchData: {
    searchTitle: string | null;
    searchClass: string | null;
    searchYear: string | null;
  };
}) => {
  const {
    searchData,
    filterData: { years, classes },
  } = props;
  const router = useRouter();
  const [expand, setExpand] = useState(false);
  const [state, setState] = useState(searchData);
  let urlArray: string[] = [];
  if (state.searchTitle) urlArray.push("title=" + state.searchTitle);
  if (state.searchYear) urlArray.push("year=" + state.searchYear);
  if (state.searchClass) urlArray.push("class=" + state.searchClass);
  return (
    <>
      <div className={classNames(styles.container)}>
        <input
          className={classNames(styles.input)}
          value={state.searchTitle ?? ""}
          onChange={(e) => {
            setState((pre) => {
              const a = { ...pre };
              a.searchTitle = e.target.value;
              console.log(a);
              return a;
            });
          }}
        />
        <button
          onClick={() => {
            router.replace(`./post?${urlArray.join("&")}`);
          }}
          className={classNames(styles.button)}
        >
          搜索
        </button>
        <div
          onClick={() => {
            setExpand((pre) => !pre);
          }}
          className={classNames(styles.expend)}
        >
          展开
        </div>
      </div>
      {expand && (
        <div className={classNames(styles.filterPanel)}>
          <div className={classNames(styles.filterLine)}>
            <div className={classNames(styles.filterTitle)}>年份</div>
            <Item
              current={state.searchYear}
              items={years}
              onClick={(value: string | null) => {
                setState((pre) => {
                  const a = { ...pre };
                  console.log(a);
                  a.searchYear = value;
                  return a;
                });
              }}
            />
          </div>
          <div className={classNames(styles.filterLine)}>
            <div className={classNames(styles.filterTitle)}>分类</div>
            <Item
              current={state.searchClass}
              items={classes}
              onClick={(value: string | null) => {
                setState((pre) => {
                  const a = { ...pre };
                  a.searchClass = value;
                  return a;
                });
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

const Item = (props: {
  current: string | null;
  items: { title: string; link: string }[];
  onClick: (value: string | null) => void;
}) => {
  const { current, items, onClick } = props;
  console.log(items);
  return (
    <>
      <div className={classNames(styles.selectors)}>
        <div
          className={classNames({
            [styles.selected]: current === null,
          })}
          onClick={() => {
            props.onClick(null);
          }}
        >
          全部
        </div>
        {items.map(({ title, link }, index) => {
          console.log(link === current, link);
          return (
            <div
              className={classNames(styles.item,{
                [styles.selected]: current === link,
              })}
              key={`items_${link}_${index}`}
              onClick={() => {
                onClick(link);
              }}
            >
              {title}
            </div>
          );
        })}
      </div>
    </>
  );
};

export { Search };

import classNames from "classnames";
import styles from "./index.module.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";

function repalce(
  currentPrama: string,
  key: string,
  lastvalue: string | null,
  nextvalue: string | null
) {
  if (lastvalue === nextvalue) {
    return currentPrama;
  }
  if (lastvalue === null) {
    if (currentPrama === "") {
      return currentPrama.concat(`${key}=${nextvalue}`);
    }
    return currentPrama.concat(`&${key}=${nextvalue}`);
  }

  return currentPrama.replace(
    `${key}=${lastvalue}`,
    nextvalue === null ? "" : `${key}=${nextvalue}`
  );
}

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
  const searchPramas = urlArray.join("&");

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
              return a;
            });
          }}
        />
        <button
          onClick={() => {
            router.replace(`./post?${searchPramas}`);
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
          {
            // TODO 替换为图标
          }
          展开
        </div>
      </div>
      {expand && (
        <div className={classNames(styles.filterPanel)}>
          <div className={classNames(styles.filterLine)}>
            <div className={classNames(styles.filterTitle)}>年份</div>
            <Item
              listKey="year"
              searchParams={searchPramas}
              current={state.searchYear}
              items={years}
              onClick={(value: string | null) => {
                setState((pre) => {
                  const a = { ...pre };
                  a.searchYear = value;
                  return a;
                });
              }}
            />
          </div>
          <div className={classNames(styles.filterLine)}>
            <div className={classNames(styles.filterTitle)}>分类</div>
            <Item
              listKey="class"
              searchParams={searchPramas}
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
  listKey: string;
  searchParams: string;
  current: string | null;
  items: { title: string; link: string }[];
  onClick: (value: string | null) => void;
}) => {
  const router = useRouter();
  const { listKey, searchParams, current, items, onClick } = props;
  return (
    <>
      <div className={classNames(styles.selectors)}>
        <div
          className={classNames(styles.item, {
            [styles.selected]: current === null,
          })}
          onClick={() => {
            router.replace(
              `/post?${repalce(searchParams, listKey, current, null)}`
            );
            props.onClick(null);
          }}
        >
          全部
        </div>
        {items.map(({ title, link }, index) => {
          return (
            <div
              className={classNames(styles.item, {
                [styles.selected]: current === link,
              })}
              key={`items_${link}_${index}`}
              onClick={() => {
                router.replace(
                  `/post?${repalce(searchParams, listKey, current, link)}`
                );
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

import classNames from "classnames";
import styles from "./index.module.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";
import searchIcon from "public/svg/searchIcon.svg";
import Image from "next/image";

const SearchIcon = () => {
  return (
    <>
      <svg
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M22.0859 9.5C22.0859 13.0899 19.1757 16 15.5859 16C14.1711 16 12.8619 15.548 11.7947 14.7805C11.746 14.9046 11.6714 15.021 11.5711 15.1213L5.20711 21.4853C4.81658 21.8758 4.18342 21.8758 3.79289 21.4853C3.40237 21.0948 3.40237 20.4616 3.79289 20.0711L10.1569 13.7071C10.2472 13.6167 10.3506 13.5472 10.461 13.4987C9.59937 12.3959 9.08588 11.0079 9.08588 9.5C9.08588 5.91015 11.996 3 15.5859 3C19.1757 3 22.0859 5.91015 22.0859 9.5ZM20.0859 9.5C20.0859 11.9853 18.0712 14 15.5859 14C13.1006 14 11.0859 11.9853 11.0859 9.5C11.0859 7.01472 13.1006 5 15.5859 5C18.0712 5 20.0859 7.01472 20.0859 9.5Z"
            fill="black"
            fillOpacity="0.6"
          />
        </g>
      </svg>
    </>
  );
};

const MenuIcon = () => {
  return (
    <>
      <svg
        width="24"
        height="25"
        viewBox="0 0 24 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.5 13C7.5 14.3807 6.38071 15.5 5 15.5C3.61929 15.5 2.5 14.3807 2.5 13C2.5 11.6193 3.61929 10.5 5 10.5C6.38071 10.5 7.5 11.6193 7.5 13ZM14.5 13C14.5 14.3807 13.3807 15.5 12 15.5C10.6193 15.5 9.5 14.3807 9.5 13C9.5 11.6193 10.6193 10.5 12 10.5C13.3807 10.5 14.5 11.6193 14.5 13ZM19 15.5C20.3807 15.5 21.5 14.3807 21.5 13C21.5 11.6193 20.3807 10.5 19 10.5C17.6193 10.5 16.5 11.6193 16.5 13C16.5 14.3807 17.6193 15.5 19 15.5Z"
            fill="black"
            fillOpacity="0.6"
          />
        </g>
      </svg>
    </>
  );
};

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
          placeholder="在此搜索文章"
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
          <SearchIcon />
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
          <MenuIcon />
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

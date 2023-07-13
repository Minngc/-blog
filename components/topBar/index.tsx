import { luxuriousScript } from "public/fonts";
import classNames from "classnames";
import Link from "next/link";
import styles from "./index.module.scss";

const TopBar = () => {
  return (
    <>
      <div className={classNames([styles.des])}></div>
      <div className={classNames([styles.topBarContainer])}>
        <div
          className={classNames(luxuriousScript.variable, [styles.topBarTitle])}
        >
          {"Ming's Blog"}
        </div>
        <ul className={classNames([styles.topBarMenu])}>
          <li>
            <Link href="/home">首页</Link>
          </li>
          <li>
            <Link href="/post">文章</Link>
          </li>
          <li>
            <Link href="/timeline">时轴</Link>
          </li>
          <li>
            <Link href="/about">关于</Link>
          </li>
          <li>
            <span></span>
          </li>
          <li>
            <Link href="/rss">RSS</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export { TopBar };

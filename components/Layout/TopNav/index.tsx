import Link from "next/link";
import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import classNames from "classnames";
import style from "./index.module.scss";
import { useRouter } from "next/router";

import { HomeIcon, PersonIcon, LinkIcon, RepoIcon } from "@/Icon";

const menu = [
  {
    title: "Home",
    url: "/",
    icon: <HomeIcon />,
  },
  {
    title: "About",
    url: "/about",
    icon: <PersonIcon />,
  },
  {
    title: "Links",
    url: "/links",
    icon: <LinkIcon />,
  },
  {
    title: "Articles",
    url: "/articles",
    icon: <RepoIcon />,
  },
  {
    title: "Others",
    url: "/others",
  },
];

const TopNav: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const router = useRouter();
  let headerRef = useRef(null);
  let Xoffset = useRef<number | undefined>(undefined);
  let Yoffset = useRef<number | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState<string>(
    "/" + router.pathname.split("/")[1],
  );

  const handleScroll = useCallback(() => {
    // 未初始化时
    if (Xoffset.current === undefined || Yoffset.current === undefined) {
    }
    // 屏幕距离顶端超过 60 px
    else if (window.pageYOffset > 60) {
      let diffX = Xoffset.current - window.pageXOffset;
      let diffY = Yoffset.current - window.pageYOffset;
      // console.log(diffX, diffY);
      if (headerRef.current !== null) {
        if (diffY < 0) {
          (headerRef.current! as HTMLHeadElement).style.top = "-60px";
        } else if (diffY > 0) {
          (headerRef.current! as HTMLHeadElement).style.top = "0px";
        }
      }
    }
    // 否则
    else (headerRef.current! as HTMLHeadElement).style.top = "0px";
    // 重置 X, Y
    Xoffset.current = window.pageXOffset;
    Yoffset.current = window.pageYOffset;
    return void 0;
  }, []);
  // 操作浏览器返回按钮点击时的时事件
  const handlePop = useCallback((e: PopStateEvent) => {
    // console.log(`/${e.state.url.split("/")[1]}`)
    setCurrentPage(`/${e.state.url.split("/")[1]}`);
  }, []);

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    window.addEventListener("popstate", handlePop);
    return () => {
      console.log("remove");
      document.removeEventListener("scroll", handleScroll);
      window.removeEventListener("popstate", handlePop);
    };
  }, [handleScroll, handlePop]);
  return (
    <>
      <header
        ref={headerRef!}
        className={classNames({ "123": true }, `${style.topNav}`)}
        style={{ top: "0" }}
      >
        <div className={style.container}>
          <div className={style.navTitle}>
            <Link
              href="/"
              onClick={() => {
                setCurrentPage("/");
              }}
            >
              Ming&apos;s Blog
            </Link>
          </div>
          <nav className={style.navol}>
            <ul>
              {menu.map((value) => {
                // console.log("rerender");
                return (
                  <li
                    key={value.url}
                    onClick={() => {
                      setCurrentPage(value.url);
                    }}
                    className={classNames(
                      value.url === currentPage ? style.actived : "",
                    )}
                  >
                    <Link href={value.url}>
                      {value.icon}
                      {value.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </header>
      <div className={style.container}>{children}</div>
    </>
  );
};

export default TopNav;

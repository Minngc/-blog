import Link from "next/link";
import {
  type ReactNode,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import classNames from "classnames";
import { useRouter } from "next/router";
import { WindowWidthContext } from "context";
import { HomeIcon, PersonIcon, LinkIcon, RepoIcon } from "@/Icon";
import style from "./index.module.scss";

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
  const [windowWidth, setWindowWidth] = useState(0);
  const [currentPage, setCurrentPage] = useState<string>(
    "/" + router.pathname.split("/")[1],
  );
  // 操作屏幕大小发生变化时的事件
  const handleResize = useCallback(() => {
    console.log(window.innerWidth);
    setWindowWidth(window.innerWidth);
  }, []);
  // 操作
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
    if (e.state) setCurrentPage(`/${e.state.url.split("/")[1]}`);
  }, []);

  useLayoutEffect(() => {
    handleResize()
    console.log("resize fn reload");
    window.addEventListener("resize", handleResize);
    return window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  useLayoutEffect(() => {
    console.log("popstate fn reload");
    window.addEventListener("popstate", handlePop);
    return () => {
      window.removeEventListener("popstate", handlePop);
    };
  },[handlePop]);

  useLayoutEffect(() => {
    console.log("scroll fn reload");
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);
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
      <WindowWidthContext.Provider value={windowWidth}>
        <div className={style.container}>{children}</div>
      </WindowWidthContext.Provider>
    </>
  );
};

export default TopNav;

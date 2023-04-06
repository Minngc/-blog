import styles from "./index.module.scss";
import classNames from "classnames";
import Image from "next/image";
import avator from "@image/jpg/avator.jpg";
import {
  LineIcon,
  GithubIcon,
  TwitterIcon,
  BilibiliIcon,
  EnvelopeIcon,
  CloudMusicIcon,
  EntertainmentIcon,
  HomeIcon,
  BookIcon,
  PenIcon,
  DailyIcon,
  LinkIcon,
  HatIcon,
  BoxIcon,
} from "@/Icon";
import DotedSplitLine from "@/decoration/dotedSplitLine";
import sms from "./sms.json";
import { useRef, useEffect } from "react";

const Menu = (props: {
  visible: boolean | undefined;
  handleMenu: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { visible, handleMenu } = props;
  useEffect(() => {
    function handleScroll(event: Event) {
      event.stopPropagation();
    }
    if (ref.current !== null) {
      ref.current.addEventListener("scroll", handleScroll);
      return ref.current.removeEventListener("scroll", handleScroll);
    }
  }, []);
  return (
    <>
      <div
        onClick={handleMenu}
        className={`${styles.musk} ${classNames({
          [styles.muskOut]: !(visible ?? true),
          [styles.muskIn]: visible ?? false,
          [styles.default]: visible === undefined,
        })}`}
      />
      <div
        ref={ref}
        className={`${styles.menuContainer} ${classNames({
          [styles.menuHidden]: !(visible ?? true),
          [styles.menuDisplay]: visible ?? false,
          [styles.default]: visible === undefined,
        })}`}
      >
        <div className={`${styles.avator}`}>
          <Image src={avator} alt={"avator"} width={80} height={80} />
        </div>
        <DotedSplitLine />
        <nav className={`${styles.smsList}`}>
          <a title="Twitter" target="_blank" href={`${sms.twitter}`}>
            <TwitterIcon />
          </a>
          <a title="Github" target="_blank" href={`${sms.github}`}>
            <GithubIcon />
          </a>
          <a title="Bilibili" target="_blank" href={`${sms.bilibli}`}>
            <BilibiliIcon />
          </a>
          <a title="E-mail" href={`${sms.mail}`}>
            <EnvelopeIcon />
          </a>
          <a title="Line" target="_blank" href={`${sms.line}`}>
            <LineIcon />
          </a>
          <a title="网易云音乐" target="_blank" href={`${sms.cloudmusic}`}>
            <CloudMusicIcon />
          </a>
        </nav>
        <DotedSplitLine />
        <div className={`${styles.menuList}`}>
          <div>
            <span>
              <HomeIcon />
              首页
            </span>
          </div>
          <div>
            <span>
              <BookIcon />
              文章
            </span>
          </div>
          <div>
            <span>
              <BoxIcon />
              归档
            </span>
          </div>
          <div>
            <span>
              <PenIcon />
              学习
            </span>
          </div>
          <div>
            <span>
              <DailyIcon />
              日常
            </span>
          </div>
          <div>
            <EntertainmentIcon />
            <span>娱乐</span>
          </div>
          <div>
            <span>
              <LinkIcon />
              友链
            </span>
          </div>
          <div>
            <span>
              <HatIcon />
              关于
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;

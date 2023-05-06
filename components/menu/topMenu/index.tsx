import { useState, } from "react";
import { useRouter } from "next/router";
import styles from "./index.module.scss";
import classNames from "classnames";
import {
  BoxIcon,
  HomeIcon,
  BookIcon,
  PenIcon,
  DailyIcon,
  LinkIcon,
  HatIcon,
  EntertainmentIcon,
} from "@/Icon";
import { MenuCollapseItem, MenuItem } from "./menuItem";
import { ClockIcon } from "@/Icon/clockIcon";

interface TopMenuProps {
  menuHidden: boolean | undefined;
}
/**
 * 页面顶端 Menu
 * @param props
 * @param props.menuHidden 当前 nav 是否处于隐藏状态
 * @returns ReactNode
 */
const TopMenu = (props: TopMenuProps) => {
  const router = useRouter();
  const { menuHidden } = props;
  const display = menuHidden !== undefined;
  return (
    <>
      {display && (
        <nav
          className={classNames([styles.menuNav], [styles.hiddenMenuNav], {
            [styles.foldMenuNav]: menuHidden,
          })}
        >
          <ul className={classNames([styles.menuNavUl])}>
            <MenuItem icon={<HomeIcon />} content="首页" />
            <MenuItem icon={<BookIcon />} content="文章" />
            <MenuItem icon={<LinkIcon />} content="友链" />
            <MenuCollapseItem
              icon={<BoxIcon />}
              content="汇总"
              items={[
                [<ClockIcon key={"clock icon"} />, "时轴"],
                [<PenIcon key="pen icon" />, "学习"],
                [<DailyIcon key="daily icon" />, "日常"],
                [<EntertainmentIcon key="entertainment icon" />, "娱乐"],
              ]}
            />
            <MenuItem icon={<HatIcon />} content="关于" />
          </ul>
        </nav>
      )}
    </>
  );
};

export { TopMenu };

import {
  EntertainmentIcon,
  HomeIcon,
  BookIcon,
  PenIcon,
  DailyIcon,
  LinkIcon,
  HatIcon,
  BoxIcon,
  ClockIcon,
} from "@/Icon";
import { ReactNode } from "react";

export interface MenuItemProps {
  href: string;
  icon: ReactNode;
  content: string;
  clearDefault?: boolean;
  className?: string;
  selected?: boolean;
}

export interface MenuItemType extends MenuItemProps {
  type: "Regular";
}

export interface MenuCollapseItemProps extends MenuItemProps {
  items: MenuItemProps[];
}

export interface MenuCollapseItemType extends MenuCollapseItemProps {
  type: "Collapse";
}

export const menuItems: (MenuItemType | MenuCollapseItemType)[] = [
  { type: "Regular", href: "/", icon: <HomeIcon />, content: "首页" },
  { type: "Regular", href: "/post", icon: <BookIcon />, content: "文章" },
  {
    type: "Collapse",
    href: "/tag",
    icon: <BoxIcon />,
    content: "归档",
    items: [
      {
        href: "/tag/study",
        icon: <PenIcon />,
        content: "学习",
      },
      {
        href: "/tag/daily",
        icon: <DailyIcon />,
        content: "日常",
      },
      {
        href: "/tag/entertainment",
        icon: <EntertainmentIcon />,
        content: "娱乐",
      },
    ],
  },
  { type: "Regular", href: "/timeline", icon: <ClockIcon />, content: "时轴" },
  { type: "Regular", href: "/links", icon: <LinkIcon />, content: "友链" },
  { type: "Regular", href: "/about", icon: <HatIcon />, content: "关于" },
];

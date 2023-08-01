import styles from "./page.module.scss";
import { SideBarTag } from "@/components/tag";
import { AnimeCard } from "@/components/animeCard";
import { LogCard } from "@/components/logCard";
import { SideBarCard } from "@/components/sideBar";

const notice =
  "博客建设工作仍在进行中，已经发布一些测试博文，之后会发布更多博文。";

const tags = [
  {
    title: "学习",
    list: [
      { tagName: "javascript" },
      { tagName: "cs" },
      { tagName: "se" },
      { tagName: "go" },
    ],
  },
  { title: "记录", list: [{ tagName: "widows" }] },
  { title: "攻略", list: [{ tagName: "shadowverse" }, { tagName: "元神" }] },
  { title: "日常", list: [{ tagName: "note" }] },
];

const anime = [
  {
    title: "异世界XX冒险录",
    state: "月曜日",
    type: ["轻改", "异世界", "后宫"],
  },
  {
    title: "异世界XX冒险录",
    state: "月曜日",
    type: ["轻改", "异世界", "后宫"],
  },
  {
    title: "异世界XX冒险录",
    state: "月曜日",
    type: ["轻改", "异世界", "后宫"],
  },
];

const log = [
  {
    date: "08/01/2023",
    logMsg: "抽象 SideBar 内容为组件",
  },
  {
    date: "07/29/2023",
    logMsg: "制作了新的 SideBar",
  },
];

const HomeSidebar = () => {
  return (
    <>
      <SideBarCard
        title="公告"
        sideNode={<div className={styles.noticeDate}>07/29/2023</div>}
        className={{ cardContainer: styles.noticeContainer }}
      >
        {notice}
      </SideBarCard>

      <SideBarCard title="标签">
        {tags.map(({ title, list }) => {
          return (
            <SideBarTag
              key={`sidebarTags_${title}`}
              title={title}
              tagList={list}
            />
          );
        })}
      </SideBarCard>

      <SideBarCard title="アニメ">
        {anime.map((value) => {
          return <AnimeCard key={`${value.title}_${value.state}`} {...value} />;
        })}
      </SideBarCard>

      <SideBarCard title="日志">
        {log.map((value) => {
          return <LogCard key={`logCard_${value.date}`} {...value} />;
        })}
      </SideBarCard>
    </>
  );
};
export default HomeSidebar;

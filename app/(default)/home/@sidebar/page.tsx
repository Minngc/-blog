import styles from "./page.module.scss";
import { SideBarTag } from "@/components/sideBar/sidebarTag";
import { AnimeCard } from "@/components/animeCard";
import { LogCard } from "@/components/logcard";
import { SideBarCard } from "@/components/sideBar/sidebar";
import tagList from "@/external/config/tagList.json";
import log from "@/external/config/pages-config/log.json";
import notice from "@/external/config/pages-config/notice.json";
import { datetrans } from "@/lib/func";
const anime: {
  title: string;
  type: [string, string, string];
  state: string;
}[] = [];

const HomeSidebar = () => {
  return (
    <>
      <SideBarCard
        title="公告"
        sideNode={
          <div className={styles.noticeDate}>{datetrans(notice.date)}</div>
        }
        className={{ cardContainer: styles.noticeContainer }}
      >
        {notice.message}
      </SideBarCard>

      <SideBarCard title="标签">
        {tagList.tagsWidthClass.map(({ link, title, list }) => {
          return (
            <SideBarTag
              key={`sidebarTags_${title}`}
              link={link}
              title={title}
              tagList={list}
            />
          );
        })}
      </SideBarCard>

      {anime.length > 0 && (
        <SideBarCard title="アニメ">
          {anime.map((value) => {
            return (
              <AnimeCard key={`${value.title}_${value.state}`} {...value} />
            );
          })}
        </SideBarCard>
      )}

      <SideBarCard title="日志">
        {log.map((value) => {
          return <LogCard key={`logCard_${value.date}`} {...value} />;
        })}
      </SideBarCard>
    </>
  );
};
export default HomeSidebar;

import { SideBarCard } from "@/components/sideBar";
import { SideBarTag } from "@/components/tag";

import tagList from "@/external/config/tagList.json"
const TimeLineSideBar = () => {
  return (
    <>
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
    </>
  );
};

export default TimeLineSideBar;

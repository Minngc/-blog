import styles from "./page.module.scss";
import LinksCard from "@/components/linksCard";
import linkList from "@/external/config/friends-link/links.json";

const Links = () => {
  return (
    <>
      <div className={styles.friendLink_container}>
        <div className={styles.friendLink_title}>友人链接</div>
        <div className={styles.friendLink_linkList}>

        {linkList.map((link) => {
          return <LinksCard key={`${link.name}_${link.link}`} {...link} />;
        })}
      </div>
        </div>
    </>
  );
};
export default Links;

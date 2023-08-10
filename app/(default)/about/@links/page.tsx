import LinksCard from "@/components/linksCard";
import linkList from "@/config/links.json";

const Links = () => {
  return (
    <>
      {linkList.map((link) => {
        return <LinksCard key={`${link.name}_${link.link}`} {...link} />;
      })}
    </>
  );
};
export default Links;

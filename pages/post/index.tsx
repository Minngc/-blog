import { getAllMatter, MatterType } from "lib/getPostFiles";
import { ArticleCard } from "@/card";
import styles from "@styles/Post.module.scss";

const Article: React.FC<{
  data: {
    data: MatterType;
    links: string;
  }[];
}> = (props) => {
  const { data } = props;
  return (
    <>
      <div className={styles.homeContainer}>
        {data.map((value) => {
          return <ArticleCard key={`article_card_${value.links}`} {...value} />;
        })}
      </div>
    </>
  );
};

export async function getStaticProps() {
  const Data = getAllMatter().sort((a, b) => b.data.Id - a.data.Id);
  return {
    props: {
      data: Data,
    },
  };
}
export default Article;

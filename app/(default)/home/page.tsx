import { AvatarWithBackground } from "@/components/avatar";
import { Line } from "@/components/line";
import { ArticleCard } from "@/components/articleCard";
import styles from "./page.module.scss";

const Home = () => {
  return (
    <>
      <div>
        <AvatarWithBackground size={140} height={120} offset={50} />
        <Line color="#000000" marginTop="15px" />
        <div className={styles.articleList}>
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
        </div>
      </div>
    </>
  );
};

export default Home;

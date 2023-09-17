import { AvatarWithBackground } from "@/components/avatar";
import { Line } from "@/components/line";
import { ArticleCard } from "@/components/articleCard";
import articles from "@/external/config/articles.json";

const Home = () => {
  return (
    <>
      {articles.map(({ year, month, fileName, data }) => {
        return (
          <ArticleCard
            year={year}
            month={month}
            data={data}
            key={`home_${year}_${month}_${fileName}`}
          />
        );
      })}
    </>
  );
};

export default Home;

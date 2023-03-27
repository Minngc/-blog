import TopNav from "@/Layout/TopNav";
import articles from "@json/articles.json";
import Link from "next/link";

interface ArticleType {
  title: string;
  tag: string[];
}

const Article: React.FC<{ articles: ArticleType[] }> = ({ articles }) => {
  return (
    <>
      This is an Article page
      <ol>
        {articles.map((value) => {
          return (
            <li key={value.title}>
              <Link href={"articles/" + value.title}>{value.title}</Link>
            </li>
          );
        })}
      </ol>
    </>
  );
};

export function getStaticProps() {
  return {
    props: {
      articles: articles,
    },
  };
}

export default Article;

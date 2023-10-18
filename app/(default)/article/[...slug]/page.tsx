import article from "@/external/config/articles.json";
import { ArticleRemote } from "@/components/article/articleRemote";

type ArticlePath = [year: string, month: string, title: string];

const Article = async (props: { params: { slug: ArticlePath } }) => {
  const { params } = props;
  const data = await fetch(
    `http://localhost:3000/api/article/${params.slug[2]}`
  ).then((res) => res.json());
  return (
    <>
      <ArticleRemote
        content={data.content}
      />
    </>
  );
};

export default Article;

export async function generateStaticParams() {
  return article.map(({ year, month, data }) => {
    return { slug: [year, month, data.link] };
  });
}

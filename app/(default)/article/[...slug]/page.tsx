import article from "@/external/config/articles.json";
import { ArticleRemote } from "@/components/article/articleRemote";
type ArticlePath = [year: string, month: string, title: string];
import { generateArticleData } from "@/util/func/dataGenerate";

const Article = async (props: { params: { slug: ArticlePath } }) => {
  const {
    params: { slug },
  } = props;

  const { content } = await generateArticleData(slug[2]);

  return (
    <>
      <ArticleRemote content={content} />
    </>
  );
};

export default Article;

export async function generateStaticParams() {
  return article.map(({ year, month, data }) => {
    return { slug: [year, month, data.link] };
  });
}

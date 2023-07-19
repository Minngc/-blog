type ArticlePath = [year: string, month: string, title: string];

async function getMd(path: string) {
  const data = await fetch(`http://localhost:3000/api/article/${path}`).then(
    (res) => {
      return res.json();
    }
  );
  return data;
}

const Article = (props: { params: { slug: ArticlePath } }) => {
  const { params } = props;
  const data = getMd(params.slug.join("/"));
  return <>123</>;
};

export default Article;

export async function generateStaticParams() {
  const posts: [year: string, month: string, title: string][] = [
    ["06", "04", "test-file"],
  ];

  return [
    {
      slug: ["06", "04", "test-file"],
    },
  ];
}

import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

interface PageProps {
  content: string | undefined;
}
interface PageParams extends ParsedUrlQuery {
  tagName: string;
}
const TagPages = (props: PageProps) => {
  const { content } = props;
  return <>{content}</>;
};

const getStaticPaths: GetStaticPaths<PageParams> = () => {
  return {
    paths: [
      {
        params: { tagName: "study" },
      },
      {
        params: { tagName: "entertainment" },
      },
      {
        params: { tagName: "daily" },
      },
    ],
    fallback: false,
  };
};

const getStaticProps: GetStaticProps<PageProps, PageParams> = ({ params }) => {
  return {
    props: {
      content: params?.tagName,
    },
  };
};

export { getStaticPaths, getStaticProps };

export default TagPages;

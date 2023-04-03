import { GetStaticPaths, GetStaticProps } from "next";
import { getDirs, getMdByYear } from "lib/getPostFiles";
import Link from "next/link";
import matter from "gray-matter";
import { MatterType } from "lib/getPostFiles";
import fs from "node:fs";

const Year: React.FC<{
  data: {
    links: string;
    data: MatterType;
  }[];
}> = (props) => {
  if (props.data.length === 0) {
    return <>Empty</>;
  }
  return (
    <ol>
      {props.data.map((value) => {
        return (
          <li key={`${value.data.Date}/${value.data.Id}`}>
            <Link href={`${value.links}`}>{`${value.data.Title}`}</Link>
          </li>
        );
      })}
    </ol>
  );
};

const getStaticPaths: GetStaticPaths = () => {
  const { dir } = getDirs("./post");
  const paths = dir.map((value) => {
    return {
      params: {
        year: value,
      },
    };
  });
  return {
    paths: paths,
    fallback: false,
  };
};

const getStaticProps: GetStaticProps = (context) => {
  const year = (context.params as { year: string }).year;
  const files = getMdByYear(year);
  const data = files.map((value) => {
    const { data } = matter(
      fs.readFileSync(
        `./post/${year}/${value.month}/${value.file}${value.extends}`,
      ),
    );
    return {
      links: `./${value.month}/${value.file}`,
      data: data as MatterType,
    };
  });

  const sortedData = data.sort((a, b) => a.data.Id - b.data.Id);
  return {
    props: {
      data: sortedData,
    },
  };
};

export default Year;
export { getStaticPaths, getStaticProps };

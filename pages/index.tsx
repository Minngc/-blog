import author from "@json/author.json";
import TopNav from "@/Layout/TopNav";
import { GetStaticPaths } from "next";
import Link from "next/link";
import { getAllMatter } from "lib/getPostFiles";

const Home: React.FC<{
  data: {
    Id: number;
    Author: string;
    Date: string;
    Tag: string;
    Title: string;
    Link: string;
    links: string;
  }[];
}> = ({ data }) => {
  return (
    <ol>
      {data.map((value) => {
        return (
          <li key={`${value.Date}/${value.Id}`}>
            <Link href={`${value.links}`}>{`${value.Title}`}</Link>
          </li>
        );
      })}
    </ol>
  );
};

export function getStaticProps() {
  const Data = getAllMatter().sort((a, b) => b.Id - a.Id);
  return {
    props: {
      data: Data,
    },
  };
}

export default Home;

import Link from "next/link";
import { MatterType, getAllMatter } from "lib/getPostFiles";

const Home: React.FC<{
  data: {
    data: MatterType;
    links: string;
  }[];
}> = ({ data }) => {
  return (
    <>
      <div className="globalContainer">
        <ol>
          {data.map((value) => {
            return (
              <li key={`${value.data.Date}/${value.data.Id}`}>
                <Link href={`${value.links}`}>{`${value.data.Title}`}</Link>
              </li>
            );
          })}
        </ol>
      </div>
    </>
  );
};

export function getStaticProps() {
  const Data = getAllMatter().sort((a, b) => b.data.Id - a.data.Id);
  return {
    props: {
      data: Data,
    },
  };
}

export default Home;

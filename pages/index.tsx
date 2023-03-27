import author from "@json/author.json";
import TopNav from "@/Layout/TopNav";

const Home: React.FC<{ author: { name: string } }> = ({ author }) => {
  return (
    <>
      <div>Hello This is {author.name}</div>
    </>
  );
};

export function getStaticProps(context: any) {
  return {
    props: {
      author: author,
    },
  };
}

export default Home;

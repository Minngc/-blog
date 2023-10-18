import { InfoLlist } from "@/components/aboutPage";

const Info = async () => {
  const data = await fetch(`http://localhost:3000/api/about`).then((res) => {
    return res.json();
  });
  return (
    <>
      <InfoLlist data={data} />
    </>
  );
};

export default Info;

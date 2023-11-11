import { InfoItem } from "@/components/aboutPage";
import { generateAboutInfo } from "@/util/func/dataGenerate";

const Info = async () => {
  const data = await generateAboutInfo();

  return (
    <>
      {data.map((value) => {
        return <InfoItem {...value} key={value.key} />;
      })}
    </>
  );
};

export default Info;

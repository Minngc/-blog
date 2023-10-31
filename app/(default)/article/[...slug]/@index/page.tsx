import styles from "./page.module.scss";
import { IndexList } from "@/components/article/articleIndexList";
import { generateArticleData } from "@/lib/func/dataGenerate";

const Menu = async (props: { params: { slug: [string, string, string] } }) => {
  const {
    params: { slug },
  } = props;

  const { tocHead } = await generateArticleData(slug[2]);

  return (
    <>
      <ul className={styles.h2_ulist}>
        <IndexList tocHead={tocHead} />
      </ul>
    </>
  );
};

export default Menu;

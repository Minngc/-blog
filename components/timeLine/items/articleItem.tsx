import Image from "next/image";
import styles from "./index.module.scss";
import Link from "next/link";
import { AngleIcon } from "@/Icon";
import test from "@image/testPhoto.png";
import TagCard from "@/card/tagCard.tsx";
import { MatterType } from "lib/getPostFiles";

const ArticleItem = (props: MatterType) => {
  return (
    <>
      <div className={styles.articleItem}>
        <div className={styles.dotContainer}>
          <div className={styles.dots} />
        </div>
        <div className={styles.triAngelContainer}>
          <div className={styles.triAngel} />
        </div>
        <ArticlePanel {...props} />
      </div>
    </>
  );
};

export default ArticleItem;

const ArticlePanel = (props: MatterType) => {
  const { Date, Title, Author, Tag, Href } = props;
  return (
    <div className={styles.article}>
      <div className={styles.descripImage}>
        <Image
          className={styles.articlePhoto}
          src={test}
          alt="testPhoto"
          width={150}
          height={150}
        />
      </div>
      <div className={styles.articleContent}>
        <div className={styles.date}>{Date}</div>
        <div className={styles.articleTitle}>
          <Link href={`/post/${Date.slice(0, 8)}Href`}>{Title}</Link>
        </div>
        <div className={styles.author}>{Author}</div>
        <div className={styles.articleMessage}>
          <div className={styles.tags}>
            <TagCard key={`test_tag1`} href="./" tagName="tag1" />
            <TagCard key={`test_tag2`} href="./" tagName="tag2" />
            <TagCard key={`test_tag3`} href="./" tagName="tag3" />
          </div>
        </div>
        <div className={styles.footer}>
          <Link href={`/post/${Date.slice(0, 8)}Href`}>
            查看全文
            <AngleIcon
              className={styles.angelTransform}
              width={16}
              height={16}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

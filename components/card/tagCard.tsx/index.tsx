import Link from "next/link";
import styles from "./index.module.scss";

interface TagCardProps {
  href: string;
  tagName: string;
}

const TagCard = (props: TagCardProps) => {
  const { href, tagName } = props;
  return (
    <Link href={href} className={styles.tagContainer}>
      {tagName}
    </Link>
  );
};

export default TagCard;

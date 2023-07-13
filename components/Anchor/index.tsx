import Link from "next/link";
import styles from "./index.module.scss";
import classNames from "classnames";

const Tag = (props: { query: string }) => {
  const { query } = props;

  return (
    <Link
      className={classNames(styles.tag)}
      href={{ pathname: "/post", query: { query: query } }}
    >
      #{query}
    </Link>
  );
};

export { Tag };

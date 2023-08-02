import Link from "next/link";
import styles from "./index.module.scss";
import classNames from "classnames";
import trans from "@/config/tagTrans.json";

const Tag = (props: { replace?: boolean; tag: string[] }) => {
  const { tag, replace = false } = props;

  return (
    <>
      <Link
        className={classNames(styles.tag)}
        replace={replace}
        href={`./post?class=${tag[0]}`}
      >
        #{(trans.classes as any)[`${tag[0]}`] ?? [tag[0]]}
      </Link>
      <Link
        className={classNames(styles.tag)}
        replace={replace}
        href={`./post?tag=${tag[1]}`}
      >
        #{(trans.tags as any)[`${tag[1]}`] ?? [tag[1]]}
      </Link>
      <Link
        className={classNames(styles.tag)}
        replace={replace}
        href={`./post?pub=${tag[2]}`}
      >
        #{(trans.pub as any)[`${tag[2]}`] ?? [tag[2]]}
      </Link>
    </>
  );
};

export { Tag };

import classNames from "classnames";
import styles from "./index.module.scss";
import Link from "next/link";

const SideBarTag = (props: {
  title: string;
  link: string;
  tagList: { link: string; title: string }[];
}) => {
  const { link, title, tagList } = props;
  if (tagList.length > 0)
    return (
      <div className={classNames(styles.tag)}>
        <div className={classNames(styles.tagTitle)}>
          <Link href={`./post?class=${link}`}>{title}</Link>
        </div>
        <div className={classNames(styles.tagList)}>
          {tagList.map(({ link, title }) => {
            return (
              <Link
                className={classNames(styles.tagItem)}
                href={`./post?tag=${link}`}
                key={`${link}_${title}`}
              >
                #{title}
              </Link>
            );
          })}
        </div>
      </div>
    );
  return null;
};

export { SideBarTag };

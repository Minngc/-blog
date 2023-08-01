import classNames from "classnames";
import styles from "./index.module.scss";
import Link from "next/link";

const SideBarTag = (props: {
  title: string;
  tagList: { link?: string; tagName: string }[];
}) => {
  const { title, tagList } = props;
  if (tagList.length > 0)
    return (
      <div className={classNames(styles.tag)}>
        <div className={classNames(styles.tagTitle)}>{title}:</div>
        <div className={classNames(styles.tagList)}>
          {tagList.map(({ link, tagName }) => {
            return (
              <Link
                className={classNames(styles.tagItem)}
                href={"./"}
                key={`${title}_${tagName}`}
              >
                #{tagName}
              </Link>
            );
          })}
        </div>
      </div>
    );
  return null;
};

export { SideBarTag };

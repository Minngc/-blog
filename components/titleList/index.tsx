import { useState } from "react";
import styles from "./index.module.scss";
import { AngleIcon } from "@/Icon";
import classNames from "classnames";

const TitleListPanel = (props: {
  tocHead: (
    | { type: "nolist"; href: string; value: string }
    | {
        type: "haslist";
        href: string;
        value: string;
        children: { href: string; value: string }[];
      }
  )[];
}) => {
  const { tocHead } = props;
  const [hiddenList, setHiddenList] = useState<boolean>(false);
  return (
    <>
      <div
        className={classNames([styles.titleListSmallPanel], {
          [styles.titleListSmallPanelExpand]: !hiddenList,
        })}
      >
        <span
          onClick={() => {
            setHiddenList((pre) => !pre);
          }}
        >
          目录
        </span>
        <TitleNav
          className={classNames([styles.smallTitleListMenu])}
          hidden={hiddenList}
          tocHead={tocHead}
        />
      </div>
      <div className={styles.titleListMiddlePanel}>
        <span
          onClick={() => {
            setHiddenList((pre) => !pre);
          }}
        >
          <AngleIcon
            className={classNames([styles.triangle], {
              [styles.triangleRotate]: !hiddenList,
            })}
            width={14}
            height={14}
          />
          目录
        </span>
        <TitleNav
          className={classNames([styles.middleTitleListMenu])}
          hidden={hiddenList}
          tocHead={tocHead}
        />
      </div>
    </>
  );
};

const TitleNav = (props: {
  className?: string;
  hidden?: boolean;
  tocHead: (
    | { type: "nolist"; href: string; value: string }
    | {
        type: "haslist";
        href: string;
        value: string;
        children: { href: string; value: string }[];
      }
  )[];
}) => {
  const { className, hidden = false, tocHead } = props;
  return (
    <nav
      className={classNames([className], {
        [styles.titleListMenuHidden]: hidden,
      })}
    >
      <ol className={classNames([styles.level1Ol])}>
        {tocHead.map((value) => {
          if (value.type === "nolist") {
            return (
              <TitleLi
                key={`headLink_${value.href}`}
                href={value.href}
                content={value.value}
              />
            );
          } else {
            return (
              <li key={`headLink_${value.href}`}>
                <a href={value.href}>{value.value}</a>
                <ol>
                  {value.children.map((h3Title) => {
                    return (
                      <TitleLi
                        key={`headLink_${h3Title.href}`}
                        href={h3Title.href}
                        content={h3Title.value}
                      />
                    );
                  })}
                </ol>
              </li>
            );
          }
        })}
      </ol>
    </nav>
  );
};

const TitleLi = (props: {
  className?: string;
  href: string;
  content: string;
}) => {
  const { content, className, href } = props;
  return (
    <li>
      <a className={className} href={href}>
        {content}
      </a>
    </li>
  );
};

export { TitleListPanel };

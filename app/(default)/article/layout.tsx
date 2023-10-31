import { ReactNode } from "react";
import styles from "./page.module.scss"
import classNames from "classnames";

const ArticleLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
        {children}
    </>
  );
};

export default ArticleLayout;

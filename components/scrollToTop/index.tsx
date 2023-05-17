import { AngleIcon } from "@/Icon";
import styles from "./index.module.scss";
import classNames from "classnames";

const ScrollToTop = () => {
  return (
    <>
      <div
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className={classNames([styles.toTop])}
      >
        <AngleIcon width={15} height={15} />
      </div>
    </>
  );
};

export { ScrollToTop };

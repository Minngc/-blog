import classNames from "classnames";
import styles from "./page.module.scss";
import { Line } from "@/components/line";

const Info = () => {
  return (
    <>
      <div className={classNames(styles.container)}>
        <div className={classNames(styles.infoContainer)}>
          <div className={classNames(styles.title)}>自我介紹</div>
        <div className={classNames(styles.info)}>這裏會填充内容</div>
        </div>
        <Line />
      </div>

      <div className={classNames(styles.container)}>
        <div className={classNames(styles.infoContainer)}>
          <div className={classNames(styles.title)}>關於本站</div>
        <div className={classNames(styles.info)}>這裏會填充内容</div>
        </div>
        <Line />
      </div>

      <div className={classNames(styles.container)}>
        <div className={classNames(styles.infoContainer)}>
          <div className={classNames(styles.title)}>社群鏈接</div>
        <div className={classNames(styles.info)}>這裏會填充内容</div>
        </div>
        <Line />
      </div>
    </>
  );
};

export default Info;

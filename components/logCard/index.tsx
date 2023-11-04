import classNames from "classnames";
import styles from "./index.module.scss";
import { datetrans } from "@/lib/func";

const LogCard = (props: { date: string; logMsg: string }) => {
  const { date, logMsg } = props;

  return (
    <div className={classNames(styles.logCard)}>
      <div className={classNames(styles.logDate)}>{datetrans(date)}:</div>
      <div className={classNames(styles.logMsg)}>{logMsg}</div>
    </div>
  );
};

export { LogCard };

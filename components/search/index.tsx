import classNames from "classnames";
import styles from "./index.module.scss";

const Search = () => {
  return (
    <div className={classNames(styles.container)}>
      <input className={classNames(styles.input)} />
      <button className={classNames(styles.button)}>搜索</button>
    </div>
  );
};

export { Search };

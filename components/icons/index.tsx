import classNames from "classnames";
import { MouseEventHandler } from "react";
import styles from "./index.module.scss";

const MenuIconToCloseIcon = (props: {
  className?: string;
  onClick: MouseEventHandler<HTMLDivElement> | undefined;
  change: boolean;
  size?: number;
}) => {
  const { onClick, change, size = 24, className } = props;
  return (
    <div
      style={{ "--size": `${size}px` }}
      className={classNames(styles.Iconcontainer, className)}
    >
      <div
        onClick={onClick}
        className={classNames(styles.menuIcon, {
          [styles.closeIcon]: change,
        })}
      >
        <div className={classNames(styles.line)} />
        <div className={classNames(styles.line)} />
        <div className={classNames(styles.line)} />
      </div>
    </div>
  );
};

export { MenuIconToCloseIcon }
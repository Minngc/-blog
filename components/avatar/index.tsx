import Image from "next/image";
import avatar from "@public/avatar.jpg";
import classNames from "classnames";
import styles from "./index.module.scss";

interface Props {
  size: 50 | 70 | 140 | 210;
  height: number;
  offset: number;
  unable?: boolean;
  className?: string;
  onLeftClick?: () => void;
  onRightClick?: () => void;
}

const AvatarWithBackground = (props: Props) => {
  const {
    size,
    height,
    offset,
    unable,
    onLeftClick = () => void 0,
    onRightClick = () => void 0,
  } = props;
  return (
    <div
      style={{ height: `${offset + size}px`, "--offset": offset + "px" }}
      className={classNames(styles.container)}
    >
      <div
        style={{ height: `${height}px` }}
        className={classNames(styles.background)}
      >
        <Avatar className={classNames(styles.avatar)} size={size} />
      </div>
      {!unable && (
        <div
          style={{ height: `${offset - height + size}px` }}
          className={styles.activePanel}
        >
          <div onClick={onLeftClick} className={styles.leftPanel} />
          <div onClick={onRightClick} className={styles.rightPanel} />
        </div>
      )}
    </div>
  );
};

const ActiveAvatarWithBackground = () => {};

const Avatar = (props: { className?: string; size: 50 | 70 | 140 | 210 }) => {
  const { size, className } = props;
  return (
    <div className={classNames([styles[`avatar_${size}`]], className)}>
      <Image src={avatar} alt="avatar" width={size} height={size} />
    </div>
  );
};

export { Avatar, AvatarWithBackground };

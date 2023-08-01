import { Avatar } from "../avatar";
import styles from "./index.module.scss";
import classNames from "classnames";

const AnimeCard = (props: { title: string; type: string[]; state: string }) => {
  const { title, type, state } = props;
  return (
    <div className={classNames(styles.animeCard)}>
      <Avatar size={70} />
      <div className={classNames(styles.animeMessage)}>
        <div className={classNames(styles.animeTitle)}>{title}</div>
        <div className={classNames(styles.animeType)}>
          类型:
          {type.map((value) => {
            return <span key={`type_${value}`}>{value}</span>;
          })}
        </div>
        <div className={classNames(styles.animeState)}>
          连载状态: <span>{state}</span>
        </div>
      </div>
    </div>
  );
};

export {AnimeCard}

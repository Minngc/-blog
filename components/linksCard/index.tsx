import classNames from "classnames";
import defaultAvatar from "@/asset/img/avatar.jpg";
import styles from "./index.module.scss";
import Image from "next/legacy/image";

const LinksCard = (props: {
  avatar?: string;
  description?: string;
  link: string;
  name: string;
}) => {
  const { name, avatar, description, link } = props;
  return (
    <>
      <a href={link} className={classNames(styles.container)}>
        <Image
          src={avatar ?? defaultAvatar}
          width={70}
          height={70}
          objectFit="cover"
          alt="avatar"
        />
        <div className={classNames(styles.middleContent)}>
          <span className={classNames(styles.nickName)}>{name}</span>
          <span className={classNames(styles.description)}>
            {description ?? "一個簡短的自我介紹"}
          </span>
        </div>
      </a>
    </>
  );
};
export default LinksCard;

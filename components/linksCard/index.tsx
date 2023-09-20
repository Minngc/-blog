import classNames from "classnames";
import defaultAvatar from "@public/avatar.jpg";
import styles from "./index.module.scss";
import Image from "next/image";
import { Line } from "../line";

const LinksCard = (props: {
  avatar?: string;
  description?: string;
  link: string;
  name: string;
}) => {
  const { name, avatar, description, link } = props;
  return (
    <>
      <div className={classNames(styles.container)}>
        <div className={classNames(styles.linkContainer)}>
          <div className={classNames(styles.avatar)}>
            <Image
              src={avatar ?? defaultAvatar}
              width={70}
              height={70}
              objectFit="cover"
              alt="avatar"
            />
          </div>
          <div className={classNames(styles.middleContent)}>
            <div className={classNames(styles.nickName)}>{name}</div>
            <div className={classNames(styles.description)}>
              {description ?? "一個簡短的自我介紹"}
            </div>
          </div>
          <div className={classNames(styles.link)}>
            <a href={link}>去看看 ＞</a>
          </div>
        </div>
      </div>
    </>
  );
};
export default LinksCard;

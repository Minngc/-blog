import classNames from "classnames";
import avatar from "@public/avatar.jpg";
import styles from "./index.module.scss";
import Image from "next/image";
import { Line } from "../line";

const LinksCard = () => {
  return (
    <>
      <div className={classNames(styles.container)}>
        <div className={classNames(styles.linkContainer)}>
          <div className={classNames(styles.avatar)}>
            <Image
              src={avatar}
              width={70}
              height={70}
              objectFit="cover"
              alt="avatar"
            />
          </div>
          <div className={classNames(styles.middleContent)}>
            <div className={classNames(styles.nickName)}>Ming</div>
            <div className={classNames(styles.description)}>
              一個簡短的自我介紹
            </div>
          </div>
          <div className={classNames(styles.link)}>
            <a href={"/about"}>去看看 ＞</a>
          </div>
        </div>
        <Line />
      </div>
    </>
  );
};
export default LinksCard;

import { AngleIcon } from "@/Icon";
import link from "../../config/json/link.json";
import Image from "next/image";
import styles from "@styles/Link.module.scss";

const Link = () => {
  return (
    <>
      <ul className={styles.linkList}>
        {link.map((value, index) => {
          return (
            <li key={`${value.link}_${index}`}>
              <div className={styles.avator}>
                <Image
                  className={styles.avator}
                  src={value.avator}
                  alt={value.name}
                  width={60}
                  height={60}
                />
              </div>
              <div className={styles.content}>
                <div className={styles.blogName}>{value.name}</div>
                <div className={styles.description}>{value.description}</div>
              </div>
              <div className={styles.link}>
                <a target="about_blank" href={value.link}>
                  查看博客
                  <AngleIcon
                    className={`${styles.angelRolated}`}
                    width={16}
                    height={16}
                  />
                </a>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Link;

import {
  LineIcon,
  GithubIcon,
  TwitterIcon,
  BilibiliIcon,
  EnvelopeIcon,
  CloudMusicIcon,
} from "@/Icon";
import sms from "../sms.json";
import styles from "../index.module.scss";

const SnsList = () => {
  return (
    <nav className={`${styles.snsList}`}>
      <a title="Twitter" target="_blank" href={`${sms.twitter}`}>
        <TwitterIcon />
      </a>
      <a title="Github" target="_blank" href={`${sms.github}`}>
        <GithubIcon />
      </a>
      <a title="Bilibili" target="_blank" href={`${sms.bilibli}`}>
        <BilibiliIcon />
      </a>
      <a title="E-mail" href={`${sms.mail}`}>
        <EnvelopeIcon />
      </a>
      <a title="Line" target="_blank" href={`${sms.line}`}>
        <LineIcon />
      </a>
      <a title="网易云音乐" target="_blank" href={`${sms.cloudmusic}`}>
        <CloudMusicIcon />
      </a>
    </nav>
  );
};

export { SnsList };

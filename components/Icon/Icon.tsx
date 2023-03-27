import Image, { type StaticImageData } from "next/image";

import styles from "./icon.module.scss";

const Icon = (props: {
  src: string | StaticImageData;
  alt: string;
  width?: number;
  height?: number;
}) => {
  return (
    <Image
      src={props.src}
      alt={props.alt}
      width={props.width}
      height={props.height}
    />
  );
};

const CenterIcon = (props: {
  src: string | StaticImageData;
  alt: string;
  width?: number;
  height?: number;
}) => {
  return (
    <span className={styles.iconSpan}>
      <Image
        src={props.src}
        alt={props.alt}
        width={props.width}
        height={props.height}
      />
    </span>
  );
};

export { Icon, CenterIcon };

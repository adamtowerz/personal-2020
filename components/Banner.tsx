import { useState } from "react";
import styles from "./Banner.module.scss";

type Props = {
  title: string;
  desc: string;
  //   closeable: boolean;
};

const Banner: React.FC<Props> = ({ title, desc }) => {
  //   const [open, setOpen] = useState(true);
  return (
    open && (
      <div className={styles.banner}>
        <p>{title}</p>
        <p>{desc}</p>
      </div>
    )
  );
};

export default Banner;

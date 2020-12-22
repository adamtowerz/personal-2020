import React from "react";
import type { FeedItem } from "../../types";
import styles from "./Moment.module.scss";

const Moment = ({
  title,
  tag_line,
  time_desc,
}: Pick<FeedItem, "title" | "tag_line" | "time_desc">) => {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h3>{title}</h3>
        <p>
          {time_desc} - {tag_line}
        </p>
      </div>
      <div role="presentation" className={styles.line} />
    </div>
  );
};

export default Moment;

import React from "react";
import type { FeedItem } from "../../types";
import Card from "./Card";
import styles from "./Card.module.css";

type Props = {
  feed: FeedItem[];
};

const CardList = ({ feed }: Props) => {
  return (
    <div className={styles.list}>
      {feed.map((item) => (
        <Card {...item} />
      ))}
    </div>
  );
};

export default CardList;

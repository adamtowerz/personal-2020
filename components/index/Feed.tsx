import React from "react";
import type { FeedItem } from "../../types";
import { FeedItemType } from "../../types";
import Card from "./Card";
import styles from "./Card.module.css";
import Moment from "./Moment";

type Props = {
  feed: FeedItem[];
};

const Feed = ({ feed }: Props) => {
  return (
    <div className={styles.list}>
      {feed.map(({ type, ...item }) =>
        type === FeedItemType.Moment ? <Moment {...item} /> : <Card {...item} />
      )}
    </div>
  );
};

export default Feed;

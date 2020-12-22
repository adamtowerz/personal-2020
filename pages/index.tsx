import Head from "next/head";
import Socials from "../components/Socials";
import Content from "../components/index/Content";
import styles from "../styles/Index.module.css";
import renderToString from "next-mdx-remote/render-to-string";

import { GetStaticProps } from "next";
import Airtable from "airtable";
import type { FeedItem } from "../types";
import Feed from "../components/index/Feed";

export const getStaticProps: GetStaticProps = async () => {
  const airtable = new Airtable({
    apiKey: process.env.AIRTABLE_KEY,
  });

  const [currentRecords, historyRecords] = await Promise.all([
    airtable
      .base("appga5u4QI2sqDov4")("Feed")
      .select({
        view: "FeedCurrent",
        fields: [
          "title",
          "type",
          "tag_line",
          "desc",
          "time_desc",
          "image",
          "link",
          "link_label",
        ],
      })
      .all(),
    airtable
      .base("appga5u4QI2sqDov4")("Feed")
      .select({
        view: "FeedHistory",
        fields: [
          "title",
          "type",
          "tag_line",
          "desc",
          "time_desc",
          "image",
          "link",
          "link_label",
          "tags",
        ],
      })
      .all(),
  ]);

  const currentFeed = await Promise.all(
    currentRecords.map(async (feedItem) => {
      const md_desc = await renderToString(feedItem.get("desc") ?? "");
      return {
        title: feedItem.get("title"),
        type: feedItem.get("type"),
        tag_line: feedItem.get("tag_line"),
        desc: md_desc,
        time_desc: feedItem.get("time_desc"),
        image: feedItem.get("image")?.[0]?.url ?? false,
        link: feedItem.get("link") ?? false,
        link_label: feedItem.get("link_label") ?? "Learn More",
        tags: feedItem.get("tags") ?? [],
      };
    })
  );

  const historyFeed = await Promise.all(
    historyRecords.map(async (feedItem) => {
      const md_desc = await renderToString(feedItem.get("desc") ?? "");
      return {
        title: feedItem.get("title"),
        type: feedItem.get("type"),
        tag_line: feedItem.get("tag_line"),
        desc: md_desc,
        time_desc: feedItem.get("time_desc"),
        image: feedItem.get("image")?.[0]?.url ?? false,
        link: feedItem.get("link") ?? false,
        link_label: feedItem.get("link_label") ?? "Learn More",
        tags: feedItem.get("tags") ?? [],
      };
    })
  );

  return {
    props: {
      currentFeed,
      historyFeed,
    },
  };
};

type Props = {
  currentFeed: FeedItem[];
  historyFeed: FeedItem[];
};

export default function Home({ currentFeed, historyFeed }: Props) {
  return (
    <>
      <Head>
        <title>Adam Towers</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.index}>
        <div className={styles.content}>
          <div className={styles.titlebox}>
            <h1>
              Heya, I'm <b>Adam</b>
            </h1>
            <Socials />
          </div>

          <Content />

          <hr />

          <section>
            <h2>What I'm up to</h2>
            <Feed feed={currentFeed} />
          </section>

          <hr />

          <section>
            <h2>What I've been up to</h2>
            <Feed feed={historyFeed} />
          </section>

          <hr />

          <Socials />
        </div>
      </main>
    </>
  );
}

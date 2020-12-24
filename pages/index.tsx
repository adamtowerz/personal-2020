import { GetStaticProps } from "next";
import Airtable from "airtable";
import type { FeedItem } from "../types";
import Feed from "../components/index/Feed";
import getFeed from "../data/Feed";

import SingleColumn from "../components/layout/SingleColumn";
import Content from "../components/index/Content";

export const getStaticProps: GetStaticProps = async () => {
  const airtable = new Airtable({
    apiKey: process.env.AIRTABLE_KEY,
  });
  const { currentFeed, historyFeed } = await getFeed(airtable);
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
    <SingleColumn>
      <>
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
      </>
    </SingleColumn>
  );
}

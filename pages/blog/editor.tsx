import { GetStaticProps } from "next";
import Airtable from "airtable";
import { getAllPosts } from "../../data/Blog";
import SingleColumn from "@/components/layout/SingleColumn";
import NewPost from "@/components/editor/NewPost";
import PostList from "@/components/editor/PostList";
import type { BlogPostMeta } from "types";

type Props = {
  posts: BlogPostMeta[];
};

export default function Editor({ posts }: Props) {
  return (
    <SingleColumn>
      <h1>Editor</h1>
      <NewPost />
      <PostList posts={posts} />
    </SingleColumn>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const airtable = new Airtable({
    apiKey: process.env.AIRTABLE_KEY,
  });
  const posts = await getAllPosts(airtable, true);
  return { props: { posts }, revalidate: 1 };
};

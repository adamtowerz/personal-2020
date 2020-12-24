import { GetStaticProps, GetStaticPaths } from "next";
import Airtable from "airtable";
import { getAllSlugs, getPostData } from "../../data/Blog";
import { BlogPost } from "../../types";
import hydrate from "next-mdx-remote/hydrate";
import SingleColumn from "../../components/layout/SingleColumn";

export default function Post({ post }: { post: BlogPost }) {
  const content = hydrate(post.content);
  return (
    <SingleColumn header={false}>
      <>
        <article>
          <h1>{post.title}</h1>
          {post.date_release && (
            <p>
              published {post.date_release}{" "}
              {post.date_edit && <span>, last edited {post.date_edit}</span>}
            </p>
          )}
          {content}
        </article>
      </>
    </SingleColumn>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const airtable = new Airtable({
    apiKey: process.env.AIRTABLE_KEY,
  });
  const post = await getPostData(airtable, params.slug as string);
  return { props: { post }, revalidate: 60 * 3 };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const airtable = new Airtable({
    apiKey: process.env.AIRTABLE_KEY,
  });

  const slugs = await getAllSlugs(airtable);
  const paths = slugs.map((slug) => ({
    params: {
      slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

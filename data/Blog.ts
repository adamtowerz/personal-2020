import type Airtable from "airtable";
import type { BlogPost } from "../types";
import renderToString from "next-mdx-remote/render-to-string";

export async function getAllSlugs(airtable: Airtable): Promise<string[]> {
  const records = await airtable
    .base("appga5u4QI2sqDov4")("Blog")
    .select({
      fields: ["slug", "status"],
    })
    .all();

  return records
    .map((record) => ({
      slug: record.get("slug"),
      status: record.get("status"),
    }))
    .filter((record) => record.status !== "private")
    .map((record) => record.slug);
}

export async function getPostData(
  airtable: Airtable,
  slug: string
): Promise<BlogPost> {
  const record = await airtable
    .base("appga5u4QI2sqDov4")("Blog")
    .select({
      maxRecords: 1,
      filterByFormula: `{slug} = '${slug}'`,
      fields: [
        "slug",
        "status",
        "title",
        "date_release",
        "date_edit",
        "content",
      ],
    })
    .all();

  const content = await renderToString(record[0].get("content"));

  const blogPost: BlogPost = {
    slug: record[0].get("slug"),
    status: record[0].get("status") ?? "private",
    title: record[0].get("title") ?? "Untitled",
    content,
  };

  let date_release = record[0].get("date_release");
  if (date_release) {
    const date = new Date(date_release);
    blogPost.date_release = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
  }

  let date_edit = record[0].get("date_edit");
  if (date_edit) {
    const date = new Date(date_edit);
    blogPost.date_edit = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}, ${date.getHours()}:${date.getMinutes()}`;
  }

  return blogPost;
}

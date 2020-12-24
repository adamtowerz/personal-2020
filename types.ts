export interface BaseFeedItem {
  title: string;
  tag_line: string;
  date?: string;
  time_desc: string | false;
  tags?: string[];
  type: FeedItemType;
}

export interface Employment extends BaseFeedItem {
  desc: string;
  image?: string;
  link?: string;
  link_label?: string;
  type: FeedItemType.Employment;
}

export interface Project extends BaseFeedItem {
  desc: string;
  image?: string;
  link?: string;
  link_label?: string;
  type: FeedItemType.Project;
}

export interface Moment extends BaseFeedItem {
  type: FeedItemType.Moment;
}

export interface Achievement extends BaseFeedItem {
  desc: string;
  image?: string;
  link?: string;
  link_label?: string;
  type: FeedItemType.Achievement;
}

export type FeedItem = Employment | Project | Moment | Achievement;

export enum FeedItemType {
  Moment = "moment",
  Employment = "employment",
  Project = "project",
  Achievement = "achievement",
}

export interface BlogPost {
  slug: string;
  status: "published" | "unlisted" | "private";
  title: string;
  date_release?: string;
  date_edit?: string;
  content: string;
}

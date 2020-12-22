export type FeedItem = {
  title: string;
  type: FeedItemType;
  tag_line: string;
  desc: string;
  time_desc: string;
  image: string | false;
  link: string | false;
  link_label: string | false;
  tags: string[];
};

export enum FeedItemType {
  Moment = "moment",
  Employment = "employment",
  Project = "project",
}

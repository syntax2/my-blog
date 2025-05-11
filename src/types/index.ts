export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  readingTime: string;
  coverImage?: string; // Seed for picsum or path to local image
  contentHtml?: string; // For individual post page
};

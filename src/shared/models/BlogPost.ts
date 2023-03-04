interface BlogPostMetadata {
  slug: string;
  date: string;
  title: string;
  blurb: string;
}

interface BlogPost {
  metadata: BlogPostMetadata;
}

export type { BlogPost, BlogPostMetadata };

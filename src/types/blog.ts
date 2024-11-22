export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  author_id: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  status: 'draft' | 'published';
  cover_image: string | null;
  reading_time: number | null;
  tags: string[] | null;
}

export interface BlogPostWithAuthor extends BlogPost {
  author: {
    username: string | null;
    avatar_url: string | null;
  };
}
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BlogPostWithAuthor } from "@/types/blog";

export const useBlogPostQuery = (slug: string | undefined) => {
  return useQuery({
    queryKey: ['blog-post', slug],
    queryFn: async () => {
      if (!slug) throw new Error('No slug provided');

      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          *,
          author:profiles(username, avatar_url)
        `)
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (error) throw error;
      if (!data) throw new Error('Blog post not found');

      return data as BlogPostWithAuthor;
    },
    enabled: !!slug,
  });
};
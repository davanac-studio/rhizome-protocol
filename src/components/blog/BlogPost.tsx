import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";

export const BlogPost = () => {
  const { slug } = useParams();
  const { toast } = useToast();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data, error } = await supabase
          .from("blog_posts")
          .select(`
            *,
            profiles:author_id (
              first_name,
              last_name,
              avatar_url
            )
          `)
          .eq("slug", slug)
          .single();

        if (error) throw error;
        setPost(data);
      } catch (error: any) {
        toast({
          title: "Error",
          description: "Failed to load post",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return <div className="max-w-4xl mx-auto py-8 px-4">Loading...</div>;
  }

  if (!post) {
    return <div className="max-w-4xl mx-auto py-8 px-4">Post not found</div>;
  }

  return (
    <article className="max-w-4xl mx-auto py-8 px-4">
      {post.cover_image && (
        <img
          src={post.cover_image}
          alt={post.title}
          className="w-full h-[400px] object-cover rounded-lg mb-8"
        />
      )}
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      
      <div className="flex items-center gap-4 mb-8">
        {post.profiles?.avatar_url && (
          <img
            src={post.profiles.avatar_url}
            alt={`${post.profiles.first_name} ${post.profiles.last_name}`}
            className="w-10 h-10 rounded-full"
          />
        )}
        <div>
          <p className="font-medium">
            {post.profiles?.first_name} {post.profiles?.last_name}
          </p>
          <p className="text-sm text-gray-500">
            {new Date(post.published_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      {post.tags && post.tags.length > 0 && (
        <div className="flex gap-2 mb-8">
          {post.tags.map((tag: string) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
};
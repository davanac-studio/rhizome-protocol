import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { useBlogPostQuery } from "@/hooks/useBlogPostQuery";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, error } = useBlogPostQuery(slug);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto py-12 px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-[400px] w-full" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">Error Loading Blog Post</h1>
          <p className="text-gray-600">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">Blog Post Not Found</h1>
          <p className="text-gray-600">The requested blog post could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {post.cover_image && (
        <div className="w-full h-[60vh] relative">
          <div className="absolute inset-0 bg-black/60" />
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-4xl mx-auto text-center text-white p-8">
              <h1 className="text-5xl font-bold mb-6">{post.title}</h1>
              {post.excerpt && (
                <p className="text-xl text-gray-200 mb-8">{post.excerpt}</p>
              )}
              <div className="flex items-center justify-center gap-4">
                <Avatar className="h-12 w-12 border-2 border-white">
                  <AvatarImage src={post.author.avatar_url || undefined} />
                  <AvatarFallback>
                    {post.author.username?.[0]?.toUpperCase() || "?"}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="font-medium">{post.author.username}</p>
                  <p className="text-sm text-gray-300">
                    {format(new Date(post.published_at || post.created_at), 'MMMM d, yyyy')}
                    {post.reading_time && ` · ${post.reading_time} min read`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto py-12 px-4">
        <article className="max-w-4xl mx-auto">
          {!post.cover_image && (
            <div className="mb-8 text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
              {post.excerpt && (
                <p className="text-xl text-gray-600 mb-6">{post.excerpt}</p>
              )}
              <div className="flex items-center justify-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={post.author.avatar_url || undefined} />
                  <AvatarFallback>
                    {post.author.username?.[0]?.toUpperCase() || "?"}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="font-medium text-gray-900">{post.author.username}</p>
                  <p className="text-sm text-gray-600">
                    {format(new Date(post.published_at || post.created_at), 'MMMM d, yyyy')}
                    {post.reading_time && ` · ${post.reading_time} min read`}
                  </p>
                </div>
              </div>
            </div>
          )}

          {post.tags && post.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap mb-8">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </div>
  );
};

export default BlogPost;
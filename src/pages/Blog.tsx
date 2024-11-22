import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BlogPostWithAuthor } from "@/types/blog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow, format } from "date-fns";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

const Blog = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select(`
          *,
          author:profiles(username, avatar_url)
        `)
        .eq("status", "published")
        .order("published_at", { ascending: false });

      if (error) throw error;
      return data as BlogPostWithAuthor[];
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
          </div>
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="h-64 w-full" />
              <CardHeader>
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const featuredPost = posts?.[0];
  const otherPosts = posts?.slice(1);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">Our Blog</h1>
            <p className="text-lg text-muted-foreground">
              Insights, thoughts, and stories about web development and design
            </p>
          </div>

          {featuredPost && (
            <Link to={`/blog/${featuredPost.slug}`}>
              <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                {featuredPost.cover_image && (
                  <div className="relative h-96 overflow-hidden">
                    <img
                      src={featuredPost.cover_image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 p-8 text-white">
                      <h2 className="text-3xl font-bold mb-4">{featuredPost.title}</h2>
                      {featuredPost.excerpt && (
                        <p className="text-lg text-gray-200 mb-4">
                          {featuredPost.excerpt}
                        </p>
                      )}
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border-2 border-white">
                          <AvatarImage src={featuredPost.author.avatar_url || undefined} />
                          <AvatarFallback>
                            {featuredPost.author.username?.[0]?.toUpperCase() || "?"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{featuredPost.author.username}</p>
                          <p className="text-sm text-gray-300">
                            {format(
                              new Date(featuredPost.published_at || featuredPost.created_at),
                              'MMMM d, yyyy'
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            </Link>
          )}

          <div className="grid gap-8 md:grid-cols-2">
            {otherPosts?.map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`}>
                <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow">
                  {post.cover_image && (
                    <div className="relative h-48">
                      <img
                        src={post.cover_image}
                        alt={post.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="space-y-2">
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex gap-2 flex-wrap">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                      {post.excerpt && (
                        <p className="text-muted-foreground line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={post.author.avatar_url || undefined} />
                        <AvatarFallback>
                          {post.author.username?.[0]?.toUpperCase() || "?"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{post.author.username}</p>
                        <p className="text-xs text-muted-foreground">
                          {format(
                            new Date(post.published_at || post.created_at),
                            'MMMM d, yyyy'
                          )}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
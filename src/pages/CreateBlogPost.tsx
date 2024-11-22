import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Editor } from "@/components/blog/Editor";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Label } from "@/components/ui/label";
import slugify from "@/utils/slugify";

interface BlogPostForm {
  title: string;
  excerpt: string;
  coverImage: FileList;
}

const CreateBlogPost = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [content, setContent] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm<BlogPostForm>();

  const createPost = useMutation({
    mutationFn: async (data: BlogPostForm) => {
      if (!user) throw new Error("User not authenticated");

      let coverImageUrl = null;
      if (data.coverImage?.[0]) {
        const file = data.coverImage[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { error: uploadError, data: uploadData } = await supabase.storage
          .from('blog-images')
          .upload(fileName, file);

        if (uploadError) throw uploadError;
        
        const { data: { publicUrl } } = supabase.storage
          .from('blog-images')
          .getPublicUrl(fileName);
          
        coverImageUrl = publicUrl;
      }

      const slug = slugify(data.title);
      const { error } = await supabase
        .from('blog_posts')
        .insert({
          title: data.title,
          slug,
          content,
          excerpt: data.excerpt,
          author_id: user.id,
          cover_image: coverImageUrl,
          status: 'draft',
        });

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Blog post created successfully",
      });
      navigate("/blog");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = handleSubmit((data) => {
    createPost.mutate(data);
  });

  if (!user) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Please login to create a blog post</h1>
          <Button onClick={() => navigate("/login")}>Login</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create New Blog Post</h1>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              {...register("title", { required: "Title is required" })}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              {...register("excerpt", { required: "Excerpt is required" })}
              className={errors.excerpt ? "border-red-500" : ""}
            />
            {errors.excerpt && (
              <p className="text-red-500 text-sm">{errors.excerpt.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverImage">Cover Image</Label>
            <Input
              id="coverImage"
              type="file"
              accept="image/*"
              {...register("coverImage")}
            />
          </div>

          <div className="space-y-2">
            <Label>Content</Label>
            <Editor content={content} onChange={setContent} />
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/blog")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createPost.isPending}
            >
              {createPost.isPending ? "Creating..." : "Create Post"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlogPost;
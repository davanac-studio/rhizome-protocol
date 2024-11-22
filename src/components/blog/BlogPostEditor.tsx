import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { ImageUpload } from "./ImageUpload";
import { EditorMenuBar } from "./EditorMenuBar";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import debounce from "lodash/debounce";

export const BlogPostEditor = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [draftId, setDraftId] = useState<string | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: "rounded-lg max-w-full h-auto",
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-primary underline',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right'],
        defaultAlignment: 'left',
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none min-h-[300px]",
      },
    },
  });

  // Auto-save functionality
  const saveAsDraft = async () => {
    if (!user || !title || !editor?.getHTML()) return;

    const slug = title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

    const postData = {
      title,
      slug,
      content: editor.getHTML(),
      cover_image: coverImage,
      author_id: user.id,
      status: "draft",
      tags,
    };

    try {
      if (draftId) {
        const { error } = await supabase
          .from("blog_posts")
          .update(postData)
          .eq("id", draftId);
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from("blog_posts")
          .insert(postData)
          .select("id")
          .single();
        if (error) throw error;
        setDraftId(data.id);
      }

      toast({
        title: "Draft saved",
        description: "Your post has been saved as a draft",
      });
    } catch (error: any) {
      console.error("Error saving draft:", error);
    }
  };

  const debouncedSave = debounce(saveAsDraft, 2000);

  useEffect(() => {
    if (title || editor?.getHTML()) {
      debouncedSave();
    }
  }, [title, editor?.getHTML()]);

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentTag.trim()) {
      e.preventDefault();
      if (!tags.includes(currentTag.trim())) {
        setTags([...tags, currentTag.trim()]);
      }
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to create a post",
        variant: "destructive",
      });
      return;
    }

    if (!title || !editor?.getHTML()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const slug = title
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");

      const postData = {
        title,
        slug,
        content: editor.getHTML(),
        cover_image: coverImage,
        author_id: user.id,
        status,
        tags,
        published_at: status === "published" ? new Date().toISOString() : null,
      };

      if (draftId) {
        const { error } = await supabase
          .from("blog_posts")
          .update(postData)
          .eq("id", draftId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("blog_posts").insert(postData);
        if (error) throw error;
      }

      toast({
        title: "Success",
        description: status === "published" ? "Post published successfully" : "Draft saved successfully",
      });

      navigate(`/posts/${slug}`);
    } catch (error: any) {
      console.error("Error creating post:", error);
      toast({
        title: "Error",
        description: "Failed to create post",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto py-8 px-4 space-y-8">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
            required
          />
        </div>

        <div>
          <Label>Cover Image</Label>
          <ImageUpload
            value={coverImage}
            onChange={setCoverImage}
            onUploadComplete={(url) => setCoverImage(url)}
          />
        </div>

        <div>
          <Label htmlFor="tags">Tags</Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="gap-1">
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          <Input
            id="tags"
            value={currentTag}
            onChange={(e) => setCurrentTag(e.target.value)}
            onKeyDown={handleTagKeyDown}
            placeholder="Add tags (press Enter)"
          />
        </div>

        <div className="border rounded-lg overflow-hidden">
          <EditorMenuBar editor={editor} />
          <div className="p-4">
            <EditorContent editor={editor} />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate("/posts")}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="outline"
          disabled={loading}
          onClick={() => setStatus("draft")}
        >
          Save as Draft
        </Button>
        <Button
          type="submit"
          disabled={loading}
          onClick={() => setStatus("published")}
        >
          {loading ? "Publishing..." : "Publish"}
        </Button>
      </div>
    </form>
  );
};
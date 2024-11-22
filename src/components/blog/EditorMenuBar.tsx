import { Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Image as ImageIcon,
  Link,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  Code,
} from "lucide-react";

interface EditorMenuBarProps {
  editor: Editor | null;
}

export const EditorMenuBar = ({ editor }: EditorMenuBarProps) => {
  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt("Enter image URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addLink = () => {
    const url = window.prompt("Enter URL");
    if (url) {
      editor.chain().focus().toggleLink({ href: url }).run();
    }
  };

  return (
    <div className="border-b p-2 flex flex-wrap gap-2">
      <Button
        size="sm"
        variant={editor.isActive("bold") ? "default" : "outline"}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant={editor.isActive("italic") ? "default" : "outline"}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant={editor.isActive("heading", { level: 1 }) ? "default" : "outline"}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        <Heading1 className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant={editor.isActive("heading", { level: 2 }) ? "default" : "outline"}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant={editor.isActive("bulletList") ? "default" : "outline"}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant={editor.isActive("orderedList") ? "default" : "outline"}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant={editor.isActive("blockquote") ? "default" : "outline"}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Quote className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant={editor.isActive("code") ? "default" : "outline"}
        onClick={() => editor.chain().focus().toggleCode().run()}
      >
        <Code className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => editor.chain().focus().undo().run()}
      >
        <Undo className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => editor.chain().focus().redo().run()}
      >
        <Redo className="h-4 w-4" />
      </Button>
      <Button size="sm" variant="outline" onClick={addImage}>
        <ImageIcon className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant={editor.isActive("link") ? "default" : "outline"}
        onClick={addLink}
      >
        <Link className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant={editor.isActive({ textAlign: "left" }) ? "default" : "outline"}
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
      >
        <AlignLeft className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant={editor.isActive({ textAlign: "center" }) ? "default" : "outline"}
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
      >
        <AlignCenter className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant={editor.isActive({ textAlign: "right" }) ? "default" : "outline"}
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
      >
        <AlignRight className="h-4 w-4" />
      </Button>
    </div>
  );
};
import { Button } from "@/components/ui/button";
import { UploadCloud } from "lucide-react";

interface UploadButtonProps {
  uploading: boolean;
  type: string;
  onClick: () => void;
}

export const UploadButton = ({ uploading, type, onClick }: UploadButtonProps) => {
  const buttonText = type === 'banner' 
    ? uploading ? "Téléchargement..." : "Modifier la bannière"
    : uploading ? "Téléchargement..." : "Choisir une image";

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full h-32 flex flex-col items-center justify-center gap-2 border-dashed"
      onClick={onClick}
      disabled={uploading}
    >
      <UploadCloud className="h-8 w-8 text-muted-foreground" />
      <span className="text-muted-foreground">
        {buttonText}
      </span>
    </Button>
  );
};
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type: "avatar" | "banner";
}

export const ImageUploadField = ({ label, value, onChange, type }: ImageUploadFieldProps) => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!user) {
        throw new Error("You must be logged in to upload files.");
      }

      setUploading(true);
      
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("Vous devez sélectionner une image à uploader.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const folderPath = type === 'avatar' ? 'avatars' : 'banners';
      const filePath = `${folderPath}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('profiles')
        .upload(filePath, file, {
          upsert: true
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('profiles')
        .getPublicUrl(filePath);

      onChange(publicUrl);
      
      toast({
        title: "Upload réussi",
        description: "Votre image a été uploadée avec succès.",
      });
    } catch (error: any) {
      toast({
        title: "Erreur lors de l'upload",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <div className="flex justify-center mt-2">
        <div className="relative">
          <Input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={uploading}
          />
          <Button type="button" variant="outline" disabled={uploading}>
            <Upload className="h-4 w-4 mr-2" />
            {uploading ? "Upload..." : "Upload"}
          </Button>
        </div>
      </div>
      {value && (
        <div className="mt-2 text-sm text-muted-foreground text-center">
          Image sélectionnée
        </div>
      )}
    </div>
  );
};
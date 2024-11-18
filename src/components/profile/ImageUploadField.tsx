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
        toast({
          title: "Erreur d'authentification",
          description: "Vous devez être connecté pour uploader des fichiers",
          variant: "destructive",
        });
        return;
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

      const { error: uploadError, data } = await supabase.storage
        .from('profiles')
        .upload(filePath, file, {
          upsert: true,
          contentType: file.type,
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
      console.error('Upload error:', error);
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
      <div className="flex gap-2 mt-1">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`URL de ${type === 'avatar' ? "l'avatar" : 'la bannière'}`}
          className="flex-1"
        />
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
    </div>
  );
};
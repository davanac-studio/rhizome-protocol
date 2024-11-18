import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Crop as CropType, PixelCrop } from 'react-image-crop';
import { ImageCropDialog } from "./ImageCropDialog";
import { ImagePreview } from "./ImagePreview";

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type: "avatar" | "banner";
  allowUnauthenticatedUpload?: boolean;
}

export const ImageUploadField = ({ 
  label, 
  value, 
  onChange, 
  type,
  allowUnauthenticatedUpload = false 
}: ImageUploadFieldProps) => {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showCropDialog, setShowCropDialog] = useState(false);
  const [crop, setCrop] = useState<CropType>({
    unit: '%',
    width: 90,
    height: 90,
    x: 5,
    y: 5
  });
  const imgRef = useRef<HTMLImageElement>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }

    const file = event.target.files[0];
    const previewUrl = URL.createObjectURL(file);
    setPreviewUrl(previewUrl);
    setShowCropDialog(true);
  };

  const getCroppedImg = async (image: HTMLImageElement, crop: PixelCrop): Promise<Blob> => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = Math.floor(crop.width * scaleX);
    canvas.height = Math.floor(crop.height * scaleY);
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error("No 2d context");
    }

    ctx.drawImage(
      image,
      Math.floor(crop.x * scaleX),
      Math.floor(crop.y * scaleY),
      Math.floor(crop.width * scaleX),
      Math.floor(crop.height * scaleY),
      0,
      0,
      Math.floor(crop.width * scaleX),
      Math.floor(crop.height * scaleY)
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          throw new Error('Canvas is empty');
        }
        resolve(blob);
      }, 'image/jpeg', 1);
    });
  };

  const handleUpload = async () => {
    if (!allowUnauthenticatedUpload && !user) {
      toast({
        title: "Erreur d'authentification",
        description: "Vous devez être connecté pour uploader des fichiers",
        variant: "destructive",
      });
      return;
    }

    if (!imgRef.current || !previewUrl) {
      return;
    }

    try {
      setUploading(true);

      // Wait for the image to be fully loaded
      await new Promise((resolve) => {
        if (imgRef.current?.complete) {
          resolve(null);
        } else {
          imgRef.current?.addEventListener('load', () => resolve(null));
        }
      });

      const croppedBlob = await getCroppedImg(imgRef.current, crop as PixelCrop);
      const file = new File([croppedBlob], 'cropped-image.jpg', { type: 'image/jpeg' });

      const folderPath = type === 'avatar' ? 'avatars' : 'banners';
      const filePath = `${folderPath}/${user?.id || 'temp'}-${Date.now()}.jpg`;

      const { error: uploadError, data } = await supabase.storage
        .from('profiles')
        .upload(filePath, file, {
          upsert: true,
          contentType: 'image/jpeg',
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('profiles')
        .getPublicUrl(filePath);

      onChange(publicUrl);
      setShowCropDialog(false);
      setPreviewUrl(null);
      
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
      <div className="flex justify-between items-center mt-1">
        <Button 
          type="button" 
          variant="outline" 
          disabled={uploading}
          className="w-full"
          onClick={() => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = (e) => handleImageSelect(e as any);
            input.click();
          }}
        >
          <Upload className="h-4 w-4 mr-2" />
          {uploading ? "Upload en cours..." : "Choisir une image"}
        </Button>
      </div>

      <ImageCropDialog
        open={showCropDialog}
        onOpenChange={setShowCropDialog}
        previewUrl={previewUrl}
        crop={crop}
        onCropChange={setCrop}
        onConfirm={handleUpload}
        uploading={uploading}
        aspectRatio={type === 'avatar' ? 1 : 16/9}
        imgRef={imgRef}
      />

      <ImagePreview src={value} type={type} />
    </div>
  );
};
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ImageCropDialog } from "./ImageCropDialog";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import { UploadCloud } from "lucide-react";
import type { PixelCrop } from "react-image-crop";

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type: "avatar" | "banner";
}

export const ImageUploadField = ({
  label,
  value,
  onChange,
  type,
}: ImageUploadFieldProps) => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [showCropDialog, setShowCropDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<PixelCrop>({
    unit: 'px',
    x: 0,
    y: 0,
    width: 100,
    height: 100
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
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
      throw new Error('No 2d context');
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

  const uploadImage = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('profiles')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    return filePath;
  };

  const handleCropComplete = async (crop: PixelCrop) => {
    if (!selectedFile || !imgRef.current) return;

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

      const croppedBlob = await getCroppedImg(imgRef.current, crop);
      const file = new File([croppedBlob], 'cropped-image.jpg', { type: 'image/jpeg' });
      const filePath = await uploadImage(file);
      
      const { data } = supabase.storage
        .from('profiles')
        .getPublicUrl(filePath);

      onChange(data.publicUrl);
      setShowCropDialog(false);
      setSelectedFile(null);
      setPreviewUrl(null);

      toast({
        title: "Image mise à jour",
        description: "Votre image a été mise à jour avec succès.",
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour de l'image.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Label>{label}</Label>
      
      <div className="flex flex-col items-center gap-4">
        <Button
          variant="outline"
          className="w-full h-32 flex flex-col items-center justify-center gap-2 border-dashed"
          onClick={() => document.getElementById(`${type}-upload`)?.click()}
          disabled={uploading}
        >
          <UploadCloud className="h-8 w-8 text-muted-foreground" />
          <span className="text-muted-foreground">
            {uploading ? "Téléchargement..." : "Choisir une image"}
          </span>
        </Button>

        {value && (
          <div className="relative w-full max-w-xs mx-auto">
            <img
              src={value}
              alt="Preview"
              className="rounded-lg object-cover mx-auto"
              style={{
                maxWidth: type === 'avatar' ? '150px' : '100%',
                height: type === 'avatar' ? '150px' : 'auto',
                aspectRatio: type === 'avatar' ? '1' : '16/9'
              }}
            />
          </div>
        )}
      </div>

      <input
        id={`${type}-upload`}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <ImageCropDialog
        open={showCropDialog}
        onOpenChange={setShowCropDialog}
        previewUrl={previewUrl}
        crop={crop}
        onCropChange={setCrop}
        onConfirm={() => handleCropComplete(crop)}
        uploading={uploading}
        aspectRatio={type === 'avatar' ? 1 : 16/9}
        imgRef={imgRef}
      />
    </div>
  );
};
import { useState, useRef } from "react";
import { Crop } from 'react-image-crop';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { ImageCropDialog } from "./ImageCropDialog";
import 'react-image-crop/dist/ReactCrop.css';

interface BannerCropHandlerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  bannerUrl: string | undefined;
  userId: string | undefined;
  onSuccess: (newBannerUrl: string) => void;
}

export const BannerCropHandler = ({ 
  isOpen, 
  onOpenChange, 
  bannerUrl,
  userId,
  onSuccess 
}: BannerCropHandlerProps) => {
  const { toast } = useToast();
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 100,
    height: 100,
    x: 0,
    y: 0
  });
  const [uploading, setUploading] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleCropComplete = async () => {
    if (!imgRef.current || !crop || !bannerUrl || !userId) return;

    setUploading(true);
    try {
      const canvas = document.createElement('canvas');
      const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
      const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
      const pixelRatio = window.devicePixelRatio;
      
      canvas.width = crop.width * scaleX;
      canvas.height = crop.height * scaleY;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      ctx.imageSmoothingQuality = 'high';

      ctx.drawImage(
        imgRef.current,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width * scaleX,
        crop.height * scaleY
      );

      // Convert the canvas to a blob
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob(
          (blob) => resolve(blob as Blob),
          'image/jpeg',
          0.95
        );
      });

      // Upload to Supabase Storage
      const fileName = `banner-${Date.now()}.jpg`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('profiles')
        .upload(fileName, blob);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('profiles')
        .getPublicUrl(fileName);

      // Update profile with new banner URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ banner_url: publicUrl })
        .eq('id', userId);

      if (updateError) throw updateError;

      onSuccess(publicUrl);
      
      toast({
        title: "Bannière mise à jour",
        description: "Votre photo de couverture a été mise à jour avec succès.",
      });
    } catch (error: any) {
      console.error('Error updating banner:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour de la bannière.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      onOpenChange(false);
    }
  };

  return (
    <ImageCropDialog
      open={isOpen}
      onOpenChange={onOpenChange}
      previewUrl={bannerUrl}
      crop={crop}
      onCropChange={setCrop}
      onConfirm={handleCropComplete}
      uploading={uploading}
      aspectRatio={16/9}
      imgRef={imgRef}
    />
  );
};
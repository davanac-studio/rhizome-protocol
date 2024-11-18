import { Label } from "@/components/ui/label";
import { ImageCropDialog } from "./ImageCropDialog";
import { useToast } from "@/components/ui/use-toast";
import { UploadButton } from "./UploadButton";
import { useImageProcessing } from "./useImageProcessing";
import 'react-image-crop/dist/ReactCrop.css';

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
  const {
    uploading,
    showCropDialog,
    previewUrl,
    crop,
    imgRef,
    setShowCropDialog,
    setCrop,
    handleFileChange,
    handleCropComplete
  } = useImageProcessing(onChange);

  const handleConfirmCrop = async () => {
    try {
      await handleCropComplete();
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
    }
  };

  return (
    <div className="space-y-4">
      <Label>{label}</Label>
      
      <div className="flex flex-col items-center gap-4">
        <UploadButton
          uploading={uploading}
          type={type}
          onClick={() => document.getElementById(`${type}-upload`)?.click()}
        />
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
        onConfirm={handleConfirmCrop}
        uploading={uploading}
        aspectRatio={type === 'avatar' ? 1 : 16/9}
        imgRef={imgRef}
      />
    </div>
  );
};
import { useRef } from "react";
import ReactCrop, { Crop as CropType } from 'react-image-crop';
import { Button } from "@/components/ui/button";
import { Crop } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import 'react-image-crop/dist/ReactCrop.css';

interface ImageCropDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  previewUrl: string | null;
  crop: CropType;
  onCropChange: (crop: CropType) => void;
  onConfirm: () => void;
  uploading: boolean;
  aspectRatio: number;
  imgRef: React.RefObject<HTMLImageElement>;
}

export const ImageCropDialog = ({
  open,
  onOpenChange,
  previewUrl,
  crop,
  onCropChange,
  onConfirm,
  uploading,
  aspectRatio,
  imgRef,
}: ImageCropDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Recadrer l'image</DialogTitle>
        </DialogHeader>
        
        {previewUrl && (
          <div className="mt-4">
            <ReactCrop
              crop={crop}
              onChange={onCropChange}
              aspect={aspectRatio}
              className="max-h-[500px] object-contain"
            >
              <img
                ref={imgRef}
                src={previewUrl}
                alt="Preview"
                className="max-w-full h-auto"
              />
            </ReactCrop>
          </div>
        )}

        <DialogFooter className="flex gap-2 mt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={uploading}
          >
            Annuler
          </Button>
          <Button
            onClick={onConfirm}
            disabled={uploading}
          >
            <Crop className="h-4 w-4 mr-2" />
            {uploading ? "Upload en cours..." : "Valider et uploader"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
import { useState, useRef } from "react";
import { Crop } from 'react-image-crop';
import { supabase } from "@/lib/supabase";

export const useImageProcessing = (onChange: (value: string) => void) => {
  const [uploading, setUploading] = useState(false);
  const [showCropDialog, setShowCropDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    x: 25,
    y: 25,
    width: 50,
    height: 50
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setShowCropDialog(true);
  };

  const getCroppedImg = async (image: HTMLImageElement, crop: Crop): Promise<Blob> => {
    const canvas = document.createElement('canvas');
    
    const pixelCrop = {
      x: (crop.x * image.width) / 100,
      y: (crop.y * image.height) / 100,
      width: (crop.width * image.width) / 100,
      height: (crop.height * image.height) / 100,
    };

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('No 2d context');
    }

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
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

  const handleCropComplete = async () => {
    if (!selectedFile || !imgRef.current) return;

    try {
      setUploading(true);

      if (!imgRef.current.complete) {
        await new Promise((resolve) => {
          imgRef.current!.addEventListener('load', resolve);
        });
      }

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
    } catch (error) {
      console.error('Error:', error);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  return {
    uploading,
    showCropDialog,
    previewUrl,
    crop,
    imgRef,
    setShowCropDialog,
    setCrop,
    handleFileChange,
    handleCropComplete
  };
};
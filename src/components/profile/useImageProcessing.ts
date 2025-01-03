import { useState, useRef } from "react";
import { Crop } from 'react-image-crop';
import { supabase } from "@/lib/supabase";

export const useImageProcessing = (onChange: (value: string) => void, defaultAspectRatio: number = 1) => {
  const [uploading, setUploading] = useState(false);
  const [showCropDialog, setShowCropDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    x: 0,
    y: 0,
    width: 100,
    height: 100 / defaultAspectRatio
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    
    // Create an image element to get the natural dimensions
    const img = new Image();
    img.onload = () => {
      const aspectRatio = img.naturalWidth / img.naturalHeight;
      
      // Calculate initial crop dimensions maintaining aspect ratio
      const newCrop: Crop = {
        unit: '%',
        x: 0,
        y: 0,
        width: 100,
        height: 100 / defaultAspectRatio
      };

      if (aspectRatio > defaultAspectRatio) {
        // Image is wider than target ratio
        newCrop.height = (100 * defaultAspectRatio) / aspectRatio;
        newCrop.y = (100 - newCrop.height) / 2;
      } else {
        // Image is taller than target ratio
        newCrop.width = 100 * aspectRatio / defaultAspectRatio;
        newCrop.x = (100 - newCrop.width) / 2;
      }

      setCrop(newCrop);
    };
    img.src = URL.createObjectURL(file);

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setShowCropDialog(true);
  };

  const getCroppedImg = async (image: HTMLImageElement, crop: Crop): Promise<Blob> => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    
    const pixelCrop = {
      x: (crop.x * image.width * scaleX) / 100,
      y: (crop.y * image.height * scaleY) / 100,
      width: (crop.width * image.width * scaleX) / 100,
      height: (crop.height * image.height * scaleY) / 100,
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

      // Make sure image is loaded
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
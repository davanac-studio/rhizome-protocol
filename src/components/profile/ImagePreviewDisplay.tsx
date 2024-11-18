interface ImagePreviewDisplayProps {
  value: string;
  type: "avatar" | "banner";
}

export const ImagePreviewDisplay = ({ value, type }: ImagePreviewDisplayProps) => {
  if (!value) return null;
  
  return (
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
  );
};
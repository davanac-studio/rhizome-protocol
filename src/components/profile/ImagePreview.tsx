interface ImagePreviewProps {
  src: string;
  type: "avatar" | "banner";
}

export const ImagePreview = ({ src, type }: ImagePreviewProps) => {
  if (!src) return null;

  return (
    <div className="mt-4">
      <img
        src={src}
        alt="Current"
        className={`rounded-lg ${
          type === 'avatar'
            ? 'w-32 h-32 object-cover'
            : 'w-full aspect-video object-cover'
        }`}
      />
    </div>
  );
};
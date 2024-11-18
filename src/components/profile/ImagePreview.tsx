import { decryptStorageUrl } from "@/utils/urlEncryption";

interface ImagePreviewProps {
  src: string;
  type: "avatar" | "banner";
}

export const ImagePreview = ({ src, type }: ImagePreviewProps) => {
  if (!src) return null;

  const decryptedSrc = decryptStorageUrl(src);

  return (
    <div className="mt-4">
      <img
        src={decryptedSrc}
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
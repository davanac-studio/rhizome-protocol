import { Button } from "@/components/ui/button";
import { Crop } from "lucide-react";

interface BannerAdjustButtonProps {
  onClick: () => void;
}

export const BannerAdjustButton = ({ onClick }: BannerAdjustButtonProps) => {
  return (
    <Button
      variant="secondary"
      size="sm"
      className="absolute bottom-4 right-4 gap-2"
      onClick={onClick}
    >
      <Crop className="h-4 w-4" />
      Ajuster la photo de couverture
    </Button>
  );
};